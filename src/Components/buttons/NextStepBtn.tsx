type NextStepBtnProps = {
  onClick: () => void;
};

export function NextStepBtn({ onClick }: NextStepBtnProps) {
  return (
    <>
      <button
        type="submit"
        className="bg-[hsl(213,96%,18%)] text-white text-base font-medium py-[0.875rem] px-[1.5rem] rounded-[0.5rem] cursor-pointer ml-auto "
        onClick={onClick}
      >
        Next Step
      </button>
    </>
  );
}
