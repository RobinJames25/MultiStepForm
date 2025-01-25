import React, { useState } from 'react';
import { ConfirmButton } from './buttons/ConfirmButton';
import { GoBackBtn } from './buttons/GoBackBtn';
import { ThankYouStep } from './ThankYouStep';

type FinishingUpProps = {
  nextStep: () => void;
  prevStep: () => void;
  selectedPlanDetails: { plan: 'arcade' | 'advanced' | 'pro'; billing: 'monthly' | 'yearly' };
  addOns: { name: string; price: number }[];
  onChangePlan: () => void; // New prop to handle the "Change" button click
};

export function FinishingUp({
  nextStep,
  prevStep,
  selectedPlanDetails,
  addOns,
  onChangePlan, // Receive the onChangePlan function as a prop
}: FinishingUpProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const planPrice =
    selectedPlanDetails.plan === 'arcade'
      ? selectedPlanDetails.billing === 'monthly'
        ? 9
        : 90
      : selectedPlanDetails.plan === 'advanced'
      ? selectedPlanDetails.billing === 'monthly'
        ? 12
        : 120
      : selectedPlanDetails.billing === 'monthly'
      ? 15
      : 150;

  const addOnTotal = addOns.reduce((total, addOn) => total + (addOn.price || 0), 0);
  const total = planPrice + addOnTotal;

  const handleConfirm = () => {
    setIsConfirmed(true);
    nextStep();
  };

  if (isConfirmed) {
    return <ThankYouStep />;
  }

  return (
    <div className="flex-1 p-[calc(3.5rem-1rem)] px-[calc(6.25rem-1rem-1rem)] pb-[calc(2rem-1rem)] overflow-hidden">
      <div className="flex-1 py-0 px-4 pb-4 min-h-0 overflow-y-auto">
        <div className="flex flex-col">
          <h1 className="text-[2rem] font-bold text-[hsl(213,96%,18%)]">Finishing up</h1>
          <p className="text-[1rem] leading-[1.5625rem] my-[0.6875rem] mb-[2.5rem] text-[hsl(231,11%,63%)]">
            Double-check everything looks OK before confirming.
          </p>
          <div className="flex flex-col gap-4">
            <div className="bg-[hsl(240,100%,98%)] rounded-lg p-4">
              <div className="grid grid-cols-[1fr_auto] justify-items-start items-center">
                <p className="text-[1rem] font-medium text-[hsl(213,96%,18%)]">
                  {selectedPlanDetails.plan} ({selectedPlanDetails.billing})
                </p>
                <button
                  onClick={onChangePlan} // Handle the click to go back to Plan selection
                  className="mt-[0.1875rem] underline text-[0.875rem] leading-[1.25rem] text-[hsl(231,11%,63%)] cursor-pointer font-inherit bg-transparent border-0"
                >
                  Change
                </button>
                <p className="text-[1rem] col-start-2 col-span-1 row-start-1 row-span-2 font-bold leading-[1.25rem] text-[hsl(213,96%,18%)]">
                  ${planPrice}/{selectedPlanDetails.billing === 'monthly' ? 'mo' : 'yr'}
                </p>
              </div>

              <div className="flex flex-col gap-[0.75rem] mt-[0.75rem] pt-[0.75rem] border-t-[1px] border-t-[hsla(231,11%,63%,0.2043)]">
                {addOns.map((addOn) => (
                  <p className="flex items-center justify-between" key={addOn.name}>
                    <span className="text-[0.875rem] text-[hsl(231,11%,63%)] leading-[1.25rem]">
                      {addOn.name}
                    </span>
                    <span className="text-[0.875rem] text-[hsl(213,96%,18%)] leading-[1.25rem]">
                      +${addOn.price}/{selectedPlanDetails.billing === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-[1.5rem] flex items-center justify-between px-[1rem]">
            <p className="text-[0.875rem] leading-[1.25rem] text-[hsl(231,11%,63%)]">
              Total ({selectedPlanDetails.billing})
            </p>
            <p className="text-[1.25rem] leading-[1.25em] font-bold text-[hsl(243,100%,62%)]">
              ${total}/{selectedPlanDetails.billing === 'monthly' ? 'mo' : 'yr'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white p-4 px-4 shadow-none mt-8">
        <GoBackBtn onClick={prevStep} />
        <ConfirmButton onClick={handleConfirm} />
      </div>
    </div>
  );
}
