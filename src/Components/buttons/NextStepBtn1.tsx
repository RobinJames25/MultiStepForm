type NextStepBtnProps = {
  onClick: () => void;
};

export function NextStepBtn1({ onClick }: NextStepBtnProps) {
  return (
    <>
      <button
        type="submit"
        className="bg-[hsl(213,96%,18%)] text-white text-base font-medium py-[0.875rem] px-[1.5rem] rounded-[0.5rem] cursor-pointer ml-auto "
      >
        Next Step
      </button>
    </>
  );
}
