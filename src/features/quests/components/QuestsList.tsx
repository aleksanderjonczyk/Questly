import { useQuests } from "../QuestContext";
import QuestCard from "./QuestCard";
import QuestForm from "./QuestForm";
import FormButton from "./FormButton";
import { useState } from "react";

export default function QuestsList() {
  const { quests, handleDeleteQuest, handleComplete } = useQuests();
  const [formOpen, setFormOpen] = useState(false);

  const activeQuests = quests.filter((q) => q.status === "active");

  return (
    <div className="quest-list">
      {activeQuests.map((quest) => (
        <QuestCard
          quest={quest}
          key={quest.id}
          onDelete={handleDeleteQuest}
          onComplete={handleComplete}
        />
      ))}
      {formOpen ? (
        <QuestForm formOpen={formOpen} setFormOpen={setFormOpen} />
      ) : (
        <FormButton setFormOpen={setFormOpen} />
      )}
    </div>
  );
}
