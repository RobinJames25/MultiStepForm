type ConfirmButtonProps = {
  onClick: () => void;
};

export function ConfirmButton({ onClick }: ConfirmButtonProps) {
  return (
    <>
      <button
        className="bg-[hsl(243,100%,62%)] text-[hsl(0,0%,100%)] text-base font-medium py-[0.875rem] px-[1.5rem] rounded-[0.5rem] cursor-pointer border-none"
        onClick={onClick}
      >
        Confirm
      </button>
    </>
  );
}
