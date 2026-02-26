import { useEffect, useState } from "react";
import { fetchCompletions } from "../../quests/api";
import type { Completion } from "../../quests/types";
import CompletionsCard from "./CompletionsCard";

export default function CompletionsList() {
  const [completions, setCompletions] = useState<Completion[]>([]);

  //   const todayKey = new Date().toISOString().slice(0, 10);

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
            <CompletionsCard completion={completion} key={completion.id} />
          ))
        : "Complete quests!"}
    </div>
  );
}
