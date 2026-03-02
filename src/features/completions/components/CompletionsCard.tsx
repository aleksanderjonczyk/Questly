import type { Completion, Quest } from "../../quests/types";

type CompletionCardProps = {
  completion: Completion;
  questById: Map<Quest["id"], Quest>;
};
export default function CompletionsCard({
  completion,
  questById,
}: CompletionCardProps) {
  const dateFormat = Intl.DateTimeFormat("pl-PL", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "CET",
  });
  const quest = questById.get(completion.questID);
  const title = quest ? quest.title : "Unknown quest";
  return (
    <div className="completions-card">
      <div className="completions-card__box">
        <p className="completions-card__xp">+{completion.xp} XP</p>
        <span className="completions-card__title-box">
          You completed <h3 className="completions-card__title">{title}</h3>
        </span>
      </div>
      <p className="completions-card__date" data-tip="Date completed">
        {dateFormat.format(new Date(completion.timestamp))}
      </p>
    </div>
  );
}
