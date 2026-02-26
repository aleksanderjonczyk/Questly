import type { Completion } from "../../quests/types";

type CompletionCardProps = {
  completion: Completion;
};
export default function CompletionsCard({ completion }: CompletionCardProps) {
  return <div>{completion.id}</div>;
}
