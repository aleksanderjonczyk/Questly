import { useEffect, useState } from "react";
import { fetchQuests } from "../api";
import { deleteQuest } from "../api";
import type { Quest } from "../types";
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

  return (
    <div className="quest-list">
      {quests.map((quest) => (
        <QuestCard quest={quest} key={quest.id} onDelete={hanldeDeleteQuest} />
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
