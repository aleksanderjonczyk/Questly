import { PlusIcon } from "@phosphor-icons/react";

type FormButtonProps = {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FormButton({ setFormOpen }: FormButtonProps) {
  return (
    <button onClick={() => setFormOpen(true)}>
      <span>
        <PlusIcon size={12} />
      </span>
      <span>Create Quest</span>
    </button>
  );
}
