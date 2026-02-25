import { useEffect, useState } from "react";
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

export default function QuestList() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [completions, setCompletions] = useState<Completion[]>([]);

  const todayKey = new Date().toISOString().slice(0, 10);

  const completedToday = new Set(
    completions
      .filter((c) => c.timestamp.slice(0, 10) === todayKey)
      .map((c) => c.questID),
  );

  const visibleQuests = quests.filter((q) => {
    if (q.status !== "active") return false;

    const isRitual = q.cadence.kind !== "once";
    if (!isRitual) return true;

    return !completedToday.has(q.id);
  });

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
