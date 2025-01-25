import React, { useState } from 'react';
import './App.css';
import { ContactForm } from './Components/ContactForm';
import { Multistep } from './Components/Multi-step';
import { AddOns } from './Components/AddOns';
import { FinishingUp } from './Components/FinishingUp';
import { Plan } from './Components/Plan';

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedPlanDetails, setSelectedPlanDetails] = useState<{
    plan: 'arcade' | 'advanced' | 'pro';
    billing: 'monthly' | 'yearly';
  }>({
    plan: 'arcade',
    billing: 'monthly',
  });

  const [addOns, setAddOns] = useState<{ name: string; price: number }[]>([]);

  const handlePlanChange = (plan: 'arcade' | 'advanced' | 'pro', billing: 'monthly' | 'yearly') => {
    setSelectedPlanDetails({ plan, billing });
  };

  const handleAddOnsChange = (selectedAddOns: { name: string; price: number }[]) => {
    setAddOns(selectedAddOns);
  };

  const handleChangePlan = () => {
    setCurrentStep(2); // Go back to the plan selection step
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex items-center justify-center p-[1.5rem] min-h-screen min-w-[375px]">
      <main className="flex flex-row w-[940px] p-4 bg-white rounded-[15px] shadow-[0_25px_40px_-20px_rgba(0,0,0,0.0951)] relative">
        <Multistep currentStep={currentStep} />

        {currentStep === 1 && <ContactForm nextStep={nextStep} />}
        {currentStep === 2 && (
          <Plan
            nextStep={nextStep}
            prevStep={prevStep}
            selectedPlanDetails={selectedPlanDetails}
            onPlanChange={handlePlanChange}
          />
        )}
        {currentStep === 3 && (
          <AddOns nextStep={nextStep} prevStep={prevStep} onAddOnsChange={handleAddOnsChange} />
        )}
        {currentStep === 4 && (
          <FinishingUp
            nextStep={nextStep}
            prevStep={prevStep}
            selectedPlanDetails={selectedPlanDetails}
            addOns={addOns}
            onChangePlan={handleChangePlan} // Pass the onChangePlan function to FinishingUp
          />
        )}
      </main>
    </div>
  );
}

export default App;
