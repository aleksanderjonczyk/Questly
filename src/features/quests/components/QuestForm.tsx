import { useState } from "react";

export default function QuestForm() {
  const [title, setTitle] = useState("");
  const [effort, setEffort] = useState("");
  const [isRitual, setIsRitual] = useState(false);
  const [cadence, setCadence] = useState("");
  const [interval, setInterval] = useState("");
  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            placeholder="Name your Quest"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <div>
            <select
              aria-label="Effort"
              value={effort}
              onChange={(e) => setEffort(e.target.value)}
            >
              <option value="" disabled>
                Choose effort
              </option>
              <option value={1}>Trivial</option>
              <option value={2}>Easy</option>
              <option value={3}>Standard</option>
              <option value={4}>Hard</option>
              <option value={5}>Brutal</option>
            </select>
            <button
              type="button"
              aria-pressed={isRitual}
              onChange={() => setIsRitual(!isRitual)}
            >
              Ritual
            </button>
            {isRitual && (
              <select
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
            {cadence === "custom" ? (
              <div>
                <span>Every</span>
                <input
                  type="number"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                />
                <span>days</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <button>Cancel</button>
            <button type="submit">Create Quest/Ritual</button>
          </div>
        </div>
      </form>
    </div>
  );
}
