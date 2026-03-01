import { useEffect, useState } from "react";
import { fetchCompletions, fetchQuests } from "../../quests/api";
import type { Completion, Quest } from "../../quests/types";
import CompletionsCard from "./CompletionsCard";

export default function CompletionsList() {
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const questById = new Map(quests.map((q) => [q.id, q]));
  //   const todayKey = new Date().toISOString().slice(0, 10);
  useEffect(function () {
    async function load() {
      const data = await fetchQuests();
      setQuests(data);
    }
    load();
  }, []);

  useEffect(function () {
    async function load() {
      const data = await fetchCompletions();
      setCompletions(data);
    }
    load();
  }, []);

  return (
    <div className="completions-list">
      {completions
        ? completions.map((completion) => (
            <CompletionsCard
              completion={completion}
              key={completion.id}
              questById={questById}
            />
          ))
        : "Complete quests!"}
    </div>
  );
}
