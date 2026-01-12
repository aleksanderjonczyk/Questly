import { useEffect, useState } from "react";
import { getQuests } from "../api";
import QuestCard from "./QuestCard";
import type { Quest } from "../types";

export default function QuestList() {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(function () {
    async function load() {
      const data = await getQuests();
      setQuests(data);
    }
    load();
  }, []);
  return (
    <div className="quest-list">
      {quests.map((quest) => (
        <QuestCard quest={quest} key={quest.id} />
      ))}
    </div>
  );
}
