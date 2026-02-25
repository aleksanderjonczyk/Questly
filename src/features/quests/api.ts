import type { Completion, NewQuest, Quest, newCompletion } from "./types";
const URL = "http://localhost:3001";

export async function fetchQuests() {
  const res = await fetch(`${URL}/quests`);

  if (!res.ok) throw new Error("Failed to load quests");

  const data = await res.json();

  return data;
}

export async function createQuest(quest: NewQuest): Promise<Quest> {
  const res = await fetch(`${URL}/quests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quest),
  });
  if (!res.ok) throw new Error("Failed to create quest");
  const data = await res.json();
  return data;
}

export async function deleteQuest(questID: Quest["id"]): Promise<void> {
  const res = await fetch(`${URL}/quests/${questID}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete quest");
}

export async function patchQuest(
  questID: Quest["id"],
  patch: Partial<Omit<Quest, "id">>,
): Promise<Quest> {
  const res = await fetch(`${URL}/quests/${questID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patch),
  });

  if (!res.ok) {
    throw new Error("Failed to patch quest");
  }

  const patchedQuest: Quest = await res.json();
  return patchedQuest;
}

export async function fetchCompletions() {
  const res = await fetch(`${URL}/completions`);

  if (!res.ok) throw new Error("Failed to load completions");

  const data = await res.json();

  return data;
}

export async function createCompletion(
  completion: newCompletion,
): Promise<Completion> {
  const res = await fetch(`${URL}/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completion),
  });
  if (!res.ok) throw new Error("Failed to complete the quest");
  const data = await res.json();
  return data;
}
