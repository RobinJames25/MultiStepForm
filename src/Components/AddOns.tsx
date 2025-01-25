import React, { useState } from 'react';
import { NextStepBtn } from './buttons/NextStepBtn';
import { GoBackBtn } from './buttons/GoBackBtn';
import checkMark from '../Assets/images/icon-checkmark.svg';

type AddOnsProps = {
  nextStep: (selectedAddOns: AddOn[]) => void;
  prevStep: () => void;
  onAddOnsChange: (selectedAddOns: { name: string; price: number }[]) => void; // Added this
};

type AddOn = {
  id: number;
  name: string;
  description: string;
  price: number;
  checked: boolean;
};

export function AddOns({ nextStep, prevStep, onAddOnsChange }: AddOnsProps) {
  // State for add-ons
  const [addOns, setAddOns] = useState<AddOn[]>([
    {
      id: 1,
      name: 'Online service',
      description: 'Access to multiplayer games',
      price: 1,
      checked: false,
    },
    {
      id: 2,
      name: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      price: 2,
      checked: false,
    },
    {
      id: 3,
      name: 'Customizable profile',
      description: 'Custom theme on your profile',
      price: 2,
      checked: false,
    },
  ]);

  // Toggle checked state for an add-on
  const toggleAddOn = (id: number) => {
    setAddOns((prevAddOns) => {
      const updatedAddOns = prevAddOns.map((addOn) =>
        addOn.id === id ? { ...addOn, checked: !addOn.checked } : addOn,
      );
      onAddOnsChange(
        updatedAddOns
          .filter((addOn) => addOn.checked)
          .map((addOn) => ({
            name: addOn.name,
            price: addOn.price,
          })),
      ); // Send updated add-ons to parent
      return updatedAddOns;
    });
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden px-[calc(6.25rem-1rem-1rem)] py-[calc(3.5rem-1rem)] pb-[calc(2rem-1rem)] pl-[calc(6.25rem-1rem)]">
      <div className="flex-1 px-[var(--card-side-padding)] pb-4 min-h-0 overflow-y-auto">
        <div className="flex flex-col">
          <h1 className="text-2rem font-bold text-[hsl(213,96%,18%)]">Pick add-ons</h1>
          <p className="text-base leading-[1.5625rem] my-[0.6875rem] mt-0 mb-[2.5rem] text-[hsl(231,11%,63%)]">
            Add-ons help enhance your gaming experience.
          </p>
          <div className="flex flex-col gap-4">
            {addOns.map((addOn) => (
              <div
                key={addOn.id}
                className={`p-4 px-6 border ${
                  addOn.checked ? 'border-[hsl(243,100%,62%)]' : 'border-[hsl(231,11%,63%)]'
                } rounded-lg bg-transparent grid grid-cols-[auto,1fr,auto] items-center cursor-pointer`}
                role="checkbox"
                aria-checked={addOn.checked}
                tabIndex={0}
                onClick={() => toggleAddOn(addOn.id)}
              >
                <div
                  className={`row-span-2 flex items-center justify-center mr-4 w-5 h-5 border ${
                    addOn.checked ? 'bg-[hsl(243,100%,62%)]' : 'bg-transparent'
                  } rounded-sm`}
                >
                  {addOn.checked && <img className="opacity-100" src={checkMark} alt="checkMark" />}
                </div>
                <p className="text-base font-medium text-[hsl(213,96%,18%)]">{addOn.name}</p>
                <p className="mt-[0.4375rem] text-sm leading-[1.25rem] text-[hsl(231,11%,63%)] col-span-1">
                  {addOn.description}
                </p>
                <p className="text-[0.9375rem] lg:text-[0.9375rem] col-start-3 col-end-3 row-start-1 row-end-3 leading-[1.25rem] text-[hsl(243,100%,62%)]">
                  +${addOn.price}/mo
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white p-4 px-4 shadow-none mt-8">
        <GoBackBtn onClick={prevStep} />
        <NextStepBtn onClick={() => nextStep(addOns.filter((addOn) => addOn.checked))} />
      </div>
    </div>
  );
}
