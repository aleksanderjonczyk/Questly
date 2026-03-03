import { useEffect, useMemo, useState } from "react";
import {
  fetchQuests,
  deleteQuest,
  createCompletion,
  patchQuest,
  fetchCompletions,
} from "../api";
import type { Completion, newCompletion, Quest } from "../types";
import QuestCard from "./QuestCard";
import QuestForm from "./QuestForm";
import FormButton from "./FormButton";

export default function TodayList() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [completions, setCompletions] = useState<Completion[]>([]);
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

  function toDateOnly(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  function daysBetween(a: Date, b: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = toDateOnly(a).getTime() - toDateOnly(b).getTime();
    return Math.floor(diff / msPerDay);
  }
  function addOneMonthClamped(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const targetMonth = month + 1;
    const targetDate = new Date(year, targetMonth, 1);

    const lastDayOfTargetMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth() + 1,
      0,
    ).getDate();

    const clampedDay = Math.min(day, lastDayOfTargetMonth);

    return new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      clampedDay,
    );
  }

  function isAvailableToday(quest: Quest): boolean {
    if (quest.status !== "active") return false;

    const last = lastCompletionByQuest.get(quest.id);
    if (!last) return true;

    const today = toDateOnly(new Date());
    const lastDate = toDateOnly(new Date(last.timestamp));

    switch (quest.cadence.kind) {
      case "once":
        return true;

      case "daily":
        return daysBetween(today, lastDate) >= 1;

      case "weekly":
        return daysBetween(today, lastDate) >= 7;

      case "monthly": {
        const nextAvailable = addOneMonthClamped(lastDate);
        return today.getTime() >= nextAvailable.getTime();
      }

      case "custom":
        return daysBetween(today, lastDate) >= quest.cadence.intervalDays;

      default:
        return true;
    }
  }
  const visibleQuests = quests.filter(isAvailableToday);

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

  function handleCreatedQuest(newQuest: Quest) {
    setQuests((quests) => [...quests, newQuest]);
  }

  async function hanldeDeleteQuest(questID: Quest["id"]) {
    try {
      await deleteQuest(questID);
      setQuests((quests) => quests.filter((quest) => quest.id !== questID));
    } catch (err) {
      console.error("Failed to delete quest", err);
    }
  }

  async function handleCompletion(
    questID: Quest["id"],
    effort: Quest["effort"],
  ) {
    try {
      const quest = quests.find((q) => q.id === questID);
      if (!quest) return;
      const newCompletion: newCompletion = {
        questID,
        timestamp: new Date().toISOString(),
        xp: effort * 5,
      };

      const completed = await createCompletion(newCompletion);
      setCompletions((prev) => [...prev, completed]);
      if (quest.cadence.kind === "once") {
        const patched = await patchQuest(questID, { status: "retired" });
        setQuests((prev) => prev.map((q) => (q.id === questID ? patched : q)));
      }
    } catch (err) {
      console.error("Failed to complete a quest", err);
    }
  }

  return (
    <div className="quest-list">
      {visibleQuests.map((quest) => (
        <QuestCard
          quest={quest}
          key={quest.id}
          onDelete={hanldeDeleteQuest}
          onComplete={handleCompletion}
        />
      ))}
      {formOpen ? (
        <QuestForm
          onCreate={handleCreatedQuest}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
        />
      ) : (
        <FormButton setFormOpen={setFormOpen} />
      )}
    </div>
  );
}
