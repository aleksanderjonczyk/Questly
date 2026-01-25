import { PlusIcon } from "@phosphor-icons/react";

type FormButtonProps = {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FormButton({ setFormOpen }: FormButtonProps) {
  return (
    <button onClick={() => setFormOpen(true)} className="form-button">
      <span className="form-button__icon">
        <PlusIcon size={12} />
      </span>
      <span className="form-button__text">Create Quest</span>
    </button>
  );
}
