import { useState } from "react";
import { createQuest } from "../api";
import type { Cadence, NewQuest, Quest } from "../types";

type QuestFormProps = {
  onCreate: (newQuest: Quest) => void;
  formOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QuestForm({
  onCreate,
  formOpen,
  setFormOpen,
}: QuestFormProps) {
  const [title, setTitle] = useState("");
  const [effort, setEffort] = useState("");
  const [isRitual, setIsRitual] = useState(false);
  const [cadence, setCadence] = useState("daily");
  const [interval, setInterval] = useState("");

  const canSubmit =
    title.trim().length > 0 &&
    effort !== "" &&
    (cadence !== "custom" || Number(interval) >= 2);

  function resetState() {
    setTitle("");
    setEffort("");
    setIsRitual(false);
    setCadence("daily");
    setInterval("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    let cadenceKind: Cadence;

    if (!isRitual) {
      cadenceKind = { kind: "once" };
    } else if (cadence === "custom") {
      cadenceKind = { kind: "custom", intervalDays: Number(interval) };
    } else {
      cadenceKind = { kind: cadence as "daily" | "weekly" | "monthly" };
    }

    const newQuest: NewQuest = {
      title,
      effort: Number(effort) as 1 | 2 | 3 | 4 | 5,
      cadence: cadenceKind,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    const created = await createQuest(newQuest);
    onCreate(created);
    resetState();
    setFormOpen(false);
  }

  return (
    <div
      className={
        formOpen === true
          ? "quest-form__container--open"
          : "quest-form__container"
      }
    >
      <form className="quest-form" onSubmit={handleSubmit}>
        <div>
          <input
            className="quest-form__title"
            type="text"
            placeholder="Name your Quest"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="quest-form__footer">
          <div className="quest-form__options">
            <select
              className="option"
              aria-label="Effort"
              value={effort}
              onChange={(e) => setEffort(e.target.value)}
            >
              <option value="" disabled>
                Choose effort
              </option>
              <option value={"1"}>Trivial</option>
              <option value={"2"}>Easy</option>
              <option value={"3"}>Standard</option>
              <option value={"4"}>Hard</option>
              <option value={"5"}>Brutal</option>
            </select>
            <button
              className={`${
                isRitual ? "quest-form__ritual--active" : ""
              } quest-form__ritual option`}
              type="button"
              aria-pressed={isRitual}
              onClick={() => {
                setIsRitual(!isRitual);
                setCadence("daily");
                setInterval("2");
              }}
            >
              Ritual
            </button>
            {isRitual && (
              <select
                className="option"
                aria-label="cadence"
                value={cadence}
                onChange={(e) => setCadence(e.target.value)}
              >
                <option value="" disabled>
                  Repeats
                </option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom</option>
              </select>
            )}
            {cadence === "custom" && isRitual ? (
              <div>
                <span>Every </span>
                <input
                  className="quest-form__interval option"
                  type="number"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                />
                <span> days</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="quest-form__buttons">
            <button
              type="button"
              className="quest-form__btn quest-form__btn--cancel"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </button>
            <button
              className="quest-form__btn quest-form__btn--submit"
              type="submit"
              disabled={!canSubmit}
            >
              Create {!isRitual ? "Quest" : "Ritual"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
