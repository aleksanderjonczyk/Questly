import {
  useReducer,
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

import {
  createCompletion,
  createQuest,
  deleteQuest,
  fetchCompletions,
  fetchQuests,
  patchQuest,
} from "./api";
import type { Completion, newCompletion, NewQuest, Quest } from "./types";

type State = {
  quests: Quest[];
  completions: Completion[];
  isLoading: boolean;
  error: string;
};

type Action =
  | { type: "loading" }
  | { type: "quests/loaded"; payload: Quest[] }
  | { type: "completions/loaded"; payload: Completion[] }
  | { type: "quest/created"; payload: Quest }
  | { type: "quest/deleted"; payload: Quest["id"] }
  | { type: "quest/patched"; payload: Quest }
  | { type: "completion/created"; payload: Completion }
  | { type: "error"; payload: string };

const initialState: State = {
  quests: [],
  completions: [],
  isLoading: false,
  error: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "quests/loaded":
      return { ...state, isLoading: false, quests: action.payload };
    case "completions/loaded":
      return { ...state, isLoading: false, completions: action.payload };
    case "quest/created":
      return {
        ...state,
        isLoading: false,
        quests: [...state.quests, action.payload],
      };
    case "quest/deleted":
      return {
        ...state,
        isLoading: false,
        quests: state.quests.filter((q) => q.id !== action.payload),
      };
    case "quest/patched":
      return {
        ...state,
        isLoading: false,
        quests: state.quests.map((q) =>
          q.id === action.payload.id ? action.payload : q,
        ),
      };
    case "completion/created":
      return {
        ...state,
        isLoading: false,
        completions: [...state.completions, action.payload],
      };
    case "error":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unkown action type");
  }
}

type QuestsContextType = {
  quests: Quest[];
  completions: Completion[];
  isLoading: boolean;
  error: string;
  handleCreateQuest: (quest: NewQuest) => Promise<void>;
  handleDeleteQuest: (questID: Quest["id"]) => Promise<void>;
  handleComplete: (
    questID: Quest["id"],
    effort: Quest["effort"],
  ) => Promise<void>;
  handlePatchQuest: (
    questID: Quest["id"],
    patch: Partial<Omit<Quest, "id">>,
  ) => Promise<void>;
};

const QuestsContext = createContext<QuestsContextType | null>(null);

export function QuestsProvider({ children }: { children: ReactNode }) {
  const [{ quests, completions, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    async function loadData() {
      dispatch({ type: "loading" });
      try {
        const [questsData, completionsData] = await Promise.all([
          fetchQuests(),
          fetchCompletions(),
        ]);
        dispatch({ type: "quests/loaded", payload: questsData });
        dispatch({ type: "completions/loaded", payload: completionsData });
      } catch {
        dispatch({ type: "error", payload: "Failed to load data" });
      }
    }
    loadData();
  }, []);

  async function handleCreateQuest(quest: NewQuest) {
    dispatch({ type: "loading" });
    try {
      const created = await createQuest(quest);
      dispatch({ type: "quest/created", payload: created });
    } catch {
      dispatch({ type: "error", payload: "Failed to create quest" });
    }
  }

  async function handleDeleteQuest(questID: Quest["id"]) {
    dispatch({ type: "loading" });
    try {
      await deleteQuest(questID);
      dispatch({ type: "quest/deleted", payload: questID });
    } catch {
      dispatch({ type: "error", payload: "Failed to delete quest" });
    }
  }

  async function handleComplete(questID: Quest["id"], effort: Quest["effort"]) {
    dispatch({ type: "loading" });
    try {
      const quest = quests.find((q) => q.id === questID);
      if (!quest) return;

      const completion: newCompletion = {
        questID,
        timestamp: new Date().toISOString(),
        xp: effort * 5,
      };

      const created = await createCompletion(completion);
      dispatch({ type: "completion/created", payload: created });

      if (quest.cadence.kind === "once") {
        const patched = await patchQuest(questID, { status: "retired" });
        dispatch({ type: "quest/patched", payload: patched });
      }
    } catch {
      dispatch({ type: "error", payload: "Failed to complete quest" });
    }
  }
  async function handlePatchQuest(
    questID: Quest["id"],
    patch: Partial<Omit<Quest, "id">>,
  ) {
    dispatch({ type: "loading" });
    try {
      const patched = await patchQuest(questID, patch);
      dispatch({ type: "quest/patched", payload: patched });
    } catch {
      dispatch({ type: "error", payload: "Failed to patch quest" });
    }
  }
  return (
    <QuestsContext.Provider
      value={{
        quests,
        completions,
        isLoading,
        error,
        handleCreateQuest,
        handleDeleteQuest,
        handleComplete,
        handlePatchQuest,
      }}
    >
      {children}
    </QuestsContext.Provider>
  );
}

export function useQuests() {
  const context = useContext(QuestsContext);
  if (!context) throw new Error("useQuests must be used within QuestsProvider");
  return context;
}
