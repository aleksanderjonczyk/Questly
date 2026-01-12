export type Cadence =
  | { kind: "once" }
  | { kind: "daily" }
  | { kind: "weekly" }
  | { kind: "monthly" }
  | { kind: "custom"; intervalDays: number };

export type Quest = {
  id: number;
  title: string;
  effort: 1 | 2 | 3 | 4 | 5;
  cadence: Cadence;
  status: "active" | "retired";
  createdDate: string;
  // project: Project;
  // description: string;
};

export type CreateQuest = Omit<Quest, "id">;
