import type { NewQuest, Quest } from "./types";
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
  if (!res.ok) throw new Error("Failt to create quest");
  const data = await res.json();
  return data;
}
