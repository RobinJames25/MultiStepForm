import bgImage from '../Assets/images/bg-sidebar-desktop.svg';

type MultistepProps = {
  currentStep: number;
};

export function Multistep({ currentStep }: MultistepProps) {
  const steps = [
    { number: 1, label: 'Your info' },
    { number: 2, label: 'Select plan' },
    { number: 3, label: 'Add-ons' },
    { number: 4, label: 'Summary' },
  ];

  return (
    <ul
      className="flex flex-col justify-start gap-8 w-[17.125rem] h-[35.5rem] bg-cover bg-no-repeat p-[2.5rem_2rem]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {steps.map((step) => (
        <li
          key={step.number}
          className="relative flex flex-col pl-[calc(2.0625rem+1rem)] min-h-[2.0625rem]"
        >
          <div
            className={`text-[0.875rem] absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-full w-[2.0625rem] h-[2.0625rem] font-bold ${
              currentStep === step.number
                ? 'bg-[hsl(206,94%,87%)] text-black'
                : 'border border-white text-white'
            }`}
          >
            {step.number}
          </div>
          <p className="text-[0.75rem] uppercase text-[hsl(228,100%,83%)]">{`STEP ${step.number}`}</p>
          <p className="text-[0.875rem] mt-[0.25rem] uppercase font-bold tracking-[1px] text-white">
            {step.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
