import iconArcade from '../Assets/images/icon-arcade.svg';
import iconAdvanced from '../Assets/images/icon-advanced.svg';
import iconPro from '../Assets/images/icon-pro.svg';
import { GoBackBtn } from './buttons/GoBackBtn';
import { NextStepBtn } from './buttons/NextStepBtn';
import { BillingOption } from './BillingOption';
import { useState } from 'react';

type PlanProps = {
  nextStep: () => void;
  prevStep: () => void;
  onPlanChange: (plan: 'arcade' | 'advanced' | 'pro', billing: 'monthly' | 'yearly') => void; // Updated type
  selectedPlanDetails: { plan: 'arcade' | 'advanced' | 'pro'; billing: 'monthly' | 'yearly' }; // Updated type
};

export function Plan({ nextStep, prevStep, onPlanChange, selectedPlanDetails }: PlanProps) {
  const [isToggled, setIsToggled] = useState(selectedPlanDetails.billing === 'yearly');
  const [selectedPlan, setSelectedPlan] = useState(selectedPlanDetails.plan);

  // Handle billing toggle change (monthly/yearly)
  const handleToggle = () => {
    const newBilling = !isToggled ? 'yearly' : 'monthly'; // Compute new billing type
    setIsToggled(!isToggled); // Update toggle state
    onPlanChange(selectedPlan, newBilling); // Pass new billing info to parent
  };

  // Handle plan change (arcade/advanced/pro)
  const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const plan = event.target.value as 'arcade' | 'advanced' | 'pro'; // Ensure proper type
    setSelectedPlan(plan);
    onPlanChange(plan, isToggled ? 'yearly' : 'monthly'); // Pass selected plan and billing to parent
  };

  // Pricing structure
  const pricing = {
    arcade: isToggled ? '$90/yr' : '$9/mo',
    advanced: isToggled ? '$120/yr' : '$12/mo',
    pro: isToggled ? '$150/yr' : '$15/mo',
    freeMonths: '2 months free',
  };

  // Message for free months with yearly billing
  const FreeMonthsMessage = () => (
    <p className="mt-2 text-[13px] font-[400] text-[hsl(213,96%,18%)]">{pricing.freeMonths}</p>
  );

  return (
    <div className="flex-1 p-[calc(3.5rem-1rem)] px-[calc(6.25rem-1rem-1rem)] py-[calc(2rem-1rem)] flex flex-col overflow-hidden">
      <div className="p-0 flex flex-col">
        <h1 className="text-2xl font-bold text-[hsl(213,96%,18%)]">Select your plan</h1>
        <p className="text-base leading-6 mt-2 mb-10 text-[hsl(231,11%,63%)]">
          You have the option of monthly or yearly billing.
        </p>
        <div className="flex gap-4">
          {/* Arcade Plan */}
          <div className="flex-1 relative">
            <input
              id="radio-arcade"
              className="absolute opacity-0"
              type="radio"
              name="plan"
              value="arcade"
              checked={selectedPlan === 'arcade'}
              onChange={handlePlanChange}
            />
            <label
              htmlFor="radio-arcade"
              className={`p-5 block relative border-[1px] rounded-lg bg-[hsl(231,100%,99%)] cursor-pointer transition-colors duration-300 hover:border-[#007BFF] ${
                selectedPlan === 'arcade' ? 'border-[3px] border-[#007BFF]' : 'border-[#A0AEC0]'
              }`}
            >
              <img className="w-10 h-10" src={iconArcade} alt="Arcade Plan" />
              <p className="mt-6 text-lg font-medium text-[hsl(213,96%,18%)]">Arcade</p>
              <p className="mt-1 text-sm text-[hsl(231,11%,63%)]">{pricing.arcade}</p>
              {isToggled && <FreeMonthsMessage />}
            </label>
          </div>

          {/* Advanced Plan */}
          <div className="flex-1 relative">
            <input
              id="radio-advanced"
              className="absolute opacity-0"
              type="radio"
              name="plan"
              value="advanced"
              checked={selectedPlan === 'advanced'}
              onChange={handlePlanChange}
            />
            <label
              htmlFor="radio-advanced"
              className={`p-5 block relative border-[1px] rounded-lg bg-[hsl(231,100%,99%)] cursor-pointer transition-colors duration-300 hover:border-[#007BFF] ${
                selectedPlan === 'advanced' ? 'border-[3px] border-[#007BFF]' : 'border-[#A0AEC0]'
              }`}
            >
              <img className="w-10 h-10" src={iconAdvanced} alt="Advanced Plan" />
              <p className="mt-6 text-lg font-medium text-[hsl(213,96%,18%)]">Advanced</p>
              <p className="mt-1 text-sm text-[hsl(231,11%,63%)]">{pricing.advanced}</p>
              {isToggled && <FreeMonthsMessage />}
            </label>
          </div>

          {/* Pro Plan */}
          <div className="flex-1 relative">
            <input
              id="radio-pro"
              className="absolute opacity-0"
              type="radio"
              name="plan"
              value="pro"
              checked={selectedPlan === 'pro'}
              onChange={handlePlanChange}
            />
            <label
              htmlFor="radio-pro"
              className={`p-5 block relative border-[1px] rounded-lg bg-[hsl(231,100%,99%)] cursor-pointer transition-colors duration-300 hover:border-[#007BFF] ${
                selectedPlan === 'pro' ? 'border-[3px] border-[#007BFF]' : 'border-[#A0AEC0]'
              }`}
            >
              <img className="w-10 h-10" src={iconPro} alt="Pro Plan" />
              <p className="mt-6 text-lg font-medium text-[hsl(213,96%,18%)]">Pro</p>
              <p className="mt-1 text-sm text-[hsl(231,11%,63%)]">{pricing.pro}</p>
              {isToggled && <FreeMonthsMessage />}
            </label>
          </div>
        </div>

        {/* Billing Option */}
        <div className="flex justify-center mt-8">
          <BillingOption
            leftLabel="Monthly"
            rightLabel="Yearly"
            onToggle={handleToggle}
            toggled={isToggled}
          />
        </div>
      </div>
      <div className="flex items-center justify-between bg-white p-4 px-4 shadow-none mt-8">
        <GoBackBtn onClick={prevStep} />
        <NextStepBtn onClick={nextStep} />
      </div>
    </div>
  );
}
