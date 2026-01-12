import { ArrowsClockwiseIcon, SparkleIcon } from "@phosphor-icons/react";
import type { Quest } from "../types";

type QuestCardProps = {
  quest: Quest;
};

export default function QuestCard({ quest }: QuestCardProps) {
  return (
    <div className="quest-card__box">
      <div className="quest-card__header">
        <input type="checkbox" className="quest-card__checkbox" />
        <h3 className="quest-card__title">{quest.title}</h3>
      </div>
      <div className="quest-card__footer">
        <p className="quest-card__xp">
          <SparkleIcon size={16} /> {quest.effort * 5} XP
        </p>

        {quest.cadence.kind !== "daily" ? (
          <ArrowsClockwiseIcon size={16} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
