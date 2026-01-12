const URL = "http://localhost:3001";

export async function GetQuests() {
  const res = await fetch(`${URL}/quests`);

  if (!res.ok) throw new Error("Failed to load quests");

  const data = await res.json();

  return data;
}
