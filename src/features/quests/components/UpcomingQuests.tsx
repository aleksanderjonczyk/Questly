import { useQuests } from "../QuestContext";
import QuestCard from "./QuestCard";
import type { Quest } from "../types";
import { useMemo } from "react";
import {
  toDateOnly,
  daysBetween,
  addOneMonthClamped,
} from "../../utilities/DateUtils";
import type { Completion } from "../types";

export default function UpcomingQuests() {
  const { quests, completions, handleComplete, handleDeleteQuest } =
    useQuests();
  const lastCompletionByQuest = useMemo(() => {
    const map = new Map<Quest["id"], Completion>();
    for (const c of completions) {
      const existing = map.get(c.questID);
      if (!existing || new Date(c.timestamp) > new Date(existing.timestamp)) {
        map.set(c.questID, c);
      }
    }
    return map;
  }, [completions]);

  function isUpcoming(quest: Quest): boolean {
    if (quest.status !== "active") return false;

    const last = lastCompletionByQuest.get(quest.id);
    if (!last) return false;

    const today = toDateOnly(new Date());
    const lastDate = toDateOnly(new Date(last.timestamp));
    switch (quest.cadence.kind) {
      case "once":
        return false;
      case "daily":
        return daysBetween(today, lastDate) < 1;
      case "weekly":
        return daysBetween(today, lastDate) < 7;
      case "monthly":
        return today.getTime() < addOneMonthClamped(lastDate).getTime();
      case "custom":
        return daysBetween(today, lastDate) < quest.cadence.intervalDays;
      default:
        return false;
    }
  }

  function nextAvailableLabel(quest: Quest): string {
    const last = lastCompletionByQuest.get(quest.id);
    if (!last) return "";

    const today = toDateOnly(new Date());
    const lastDate = toDateOnly(new Date(last.timestamp));

    switch (quest.cadence.kind) {
      case "daily":
        return "Available tomorrow";
      case "weekly": {
        const daysLeft = 7 - daysBetween(today, lastDate);
        return `Available in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`;
      }
      case "monthly": {
        const daysLeft = daysBetween(addOneMonthClamped(lastDate), today);
        return `Available in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`;
      }
      case "custom": {
        const daysLeft =
          quest.cadence.intervalDays - daysBetween(today, lastDate);
        return `Available in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`;
      }
      default:
        return "";
    }
  }

  const visibleQuests = quests.filter(isUpcoming);

  return (
    <div className="quest-list">
      {visibleQuests.map((quest) => (
        <QuestCard
          quest={quest}
          key={quest.id}
          onDelete={handleDeleteQuest}
          onComplete={handleComplete}
          disabled={true}
          sublabel={nextAvailableLabel(quest)}
        />
      ))}
    </div>
  );
}
