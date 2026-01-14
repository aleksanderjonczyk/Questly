import { useEffect, useState } from "react";
import { fetchQuests } from "../api";
import type { Quest } from "../types";
import QuestCard from "./QuestCard";
import QuestForm from "./QuestForm";

export default function QuestList() {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(function () {
    async function load() {
      const data = await fetchQuests();
      setQuests(data);
    }
    load();
  }, []);

  function handleCreatedQuest(newQuest: Quest) {
    setQuests((quests) => [...quests, newQuest]);
  }

  return (
    <div className="quest-list">
      {quests.map((quest) => (
        <QuestCard quest={quest} key={quest.id} />
      ))}
      <QuestForm onCreate={handleCreatedQuest} />
    </div>
  );
}
