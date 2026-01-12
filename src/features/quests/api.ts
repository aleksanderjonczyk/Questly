const URL = "http://localhost:3001";

export async function getQuests() {
  const res = await fetch(`${URL}/quests`);

  if (!res.ok) throw new Error("Failed to load quests");

  const data = await res.json();

  console.log(data);
  return data;
}
