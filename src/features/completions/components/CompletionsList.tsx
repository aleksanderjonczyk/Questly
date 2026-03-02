import { useEffect, useState } from "react";
import { fetchCompletions, fetchQuests } from "../../quests/api";
import type { Completion, Quest } from "../../quests/types";
import CompletionsCard from "./CompletionsCard";

export default function CompletionsList() {
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const questById = new Map(quests.map((q) => [q.id, q]));
  const sortedCompletions = [...completions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
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
        ? sortedCompletions.map((completion) => (
            <CompletionsCard
              completion={completion}
              key={completion.id}
              questById={questById}
            />
          ))
        : "Go complete your first quest to see your completions here!"}
    </div>
  );
}
