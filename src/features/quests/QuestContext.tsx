import { useReducer } from "react";
import { createContext, useContext, useEffect } from "react";
import { fetchCompletions, fetchQuests } from "./api";
import type { Completion, Quest } from "./types";

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

function QuestsProvider({ children }) {
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
}
