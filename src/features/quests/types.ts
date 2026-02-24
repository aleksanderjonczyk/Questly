export type Cadence =
  | { kind: "once" }
  | { kind: "daily" }
  | { kind: "weekly" }
  | { kind: "monthly" }
  | { kind: "custom"; intervalDays: number };

export type Quest = {
  id: string | number;
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

export type Completion = {
  id: string | number;
  questID: Quest["id"];
  timestamp: string;
  xp: number;
};

export type newCompletion = Omit<Completion, "id">;
