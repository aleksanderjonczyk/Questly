import { useState } from "react";

export default function QuestForm() {
  const [title, setTitle] = useState("");
  const [effort, setEffort] = useState("");
  const [isRitual, setIsRitual] = useState(false);
  const [cadence, setCadence] = useState("daily");
  const [interval, setInterval] = useState("");

  const canSubmit =
    title.trim().length > 0 &&
    effort !== "" &&
    (cadence !== "custom" || Number(interval) >= 2);
  return (
    <div>
      <form className="quest-form">
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
            >
              Cancel
            </button>
            <button
              className="quest-form__btn quest-form__btn--submit"
              type="submit"
              disabled={!canSubmit}
              onSubmit={(e) => e.preventDefault()}
            >
              Create {!isRitual ? "Quest" : "Ritual"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
