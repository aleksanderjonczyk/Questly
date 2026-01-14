export type Cadence =
  | { kind: "once" }
  | { kind: "daily" }
  | { kind: "weekly" }
  | { kind: "monthly" }
  | { kind: "custom"; intervalDays: number };

export type Quest = {
  id: string;
  title: string;
  effort: 1 | 2 | 3 | 4 | 5;
  cadence: Cadence;
  status: "active" | "retired";
  createdAt: string;
  // project: Project;
  // description: string;
  // scheduled: string;
};

export type NewQuest = Omit<Quest, "id">;
