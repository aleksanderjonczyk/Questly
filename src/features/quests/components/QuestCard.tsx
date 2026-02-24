import {
  ArrowsClockwiseIcon,
  CheckIcon,
  PencilSimpleLineIcon,
  SparkleIcon,
  XIcon,
} from "@phosphor-icons/react";
import type { Quest } from "../types";

type QuestCardProps = {
  quest: Quest;
  onDelete: (questID: Quest["id"]) => void;
  onComplete: (questID: Quest["id"], effort: Quest["effort"]) => void;
};

export default function QuestCard({
  quest,
  onDelete,
  onComplete,
}: QuestCardProps) {
  return (
    <div className="quest-card">
      <button
        className="quest-card__checkbox"
        onClick={() => onComplete(quest.id, quest.effort)}
      >
        <CheckIcon size={12} color="#b9b9b9" weight="bold" />
      </button>
      <div className="quest-card__box">
        <div className="quest-card__header">
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
      <div className="quest-card__options">
        <button
          className="quest-card__options-btn"
          data-tip="Delete"
          aria-label="Delete quest"
          onClick={() => onDelete(quest.id)}
        >
          <XIcon size={18} className="quest-card__delete" />
        </button>
        <button
          className="quest-card__options-btn"
          data-tip="Edit"
          aria-label="Edit quest"
        >
          <PencilSimpleLineIcon size={18} className="quest-card__edit" />
        </button>
      </div>
    </div>
  );
}
