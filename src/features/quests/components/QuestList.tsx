import { useEffect, useState } from "react";
import { fetchQuests, deleteQuest, createCompletion } from "../api";
import {} from "../api";
import type { newCompletion, Quest } from "../types";
import QuestCard from "./QuestCard";
import QuestForm from "./QuestForm";
import FormButton from "./FormButton";

export default function QuestList() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(function () {
    async function load() {
      const data = await fetchQuests();
      setQuests(data);
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
      const newCompletion: newCompletion = {
        questID,
        timestamp: new Date().toISOString(),
        xp: effort * 5,
      };

      const completed = await createCompletion(newCompletion);
      setQuests((quests) =>
        quests.filter((quest) => quest.id !== completed.questID),
      );
    } catch (err) {
      console.error("Failed to complete a quest", err);
    }
  }

  return (
    <div className="quest-list">
      {quests.map((quest) => (
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
