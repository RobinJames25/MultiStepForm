type GoBackBtnProps = {
  onClick: () => void;
};

export function GoBackBtn({ onClick }: GoBackBtnProps) {
  return (
    <>
      <button
        className="font-inherit bg-transparent border-0 text-gray-500 text-base font-medium rounded-[0.5rem] cursor-pointer"
        onClick={onClick}
      >
        Go Back
      </button>
    </>
  );
}
