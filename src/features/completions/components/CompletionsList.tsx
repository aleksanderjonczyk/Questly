import CompletionsCard from "./CompletionsCard";
import { useQuests } from "../../quests/QuestContext";

export default function CompletionsList() {
  const { quests, completions } = useQuests();
  const questById = new Map(quests.map((q) => [q.id, q]));
  const sortedCompletions = [...completions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div className="completions-list">
      {completions.length > 0
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
