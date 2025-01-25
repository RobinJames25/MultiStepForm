import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { NextStepBtn1 } from './buttons/NextStepBtn1';

type Contact = {
  name: string;
  email: string;
  number: string;
};

type ContactFormProps = {
  nextStep: () => void;
};

export function ContactForm({ nextStep }: ContactFormProps) {
  const [contact, setContact] = useState<Contact>({ name: '', email: '', number: '' });
  const [errors, setErrors] = useState<{ [key in keyof Contact]?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form and clear localStorage on page reload
  useEffect(() => {
    const handlePageReload = () => {
      localStorage.removeItem('contactFormData');
    };

    // Reset form state to defaults
    setContact({ name: '', email: '', number: '' });

    // Clear localStorage when the page reloads
    window.addEventListener('beforeunload', handlePageReload);

    return () => {
      window.removeEventListener('beforeunload', handlePageReload);
    };
  }, []);

  // Handle input change
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));

    // Clear error as user types
    if (isSubmitted) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  }

  // Validate fields
  function validateFields() {
    const newErrors: { [key in keyof Contact]?: string } = {};

    if (!contact.name.trim()) newErrors.name = 'This field is required';
    if (!contact.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com$/.test(contact.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!contact.number.trim()) {
      newErrors.number = 'This field is required';
    } else if (!/^\+?[0-9]{7,15}$/.test(contact.number)) {
      newErrors.number = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle form submission
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateFields()) {
      // Save data to localStorage for navigation
      localStorage.setItem('contactFormData', JSON.stringify(contact));
      nextStep(); // Move to the next step if validation passes
    }
  }

  return (
    <div className="flex flex-col overflow-hidden flex-1 pt-[2.5rem] pr-[4.25rem] pb-[1rem] pl-[5.25rem]">
      <div className="flex-1 py-0 px-4 pb-4 min-h-0 overflow-y-auto">
        <div className="flex flex-col p-0">
          <h1 className="text-3xl font-bold text-[hsl(213,96%,18%)]">Personal info</h1>
          <p className="text-base leading-[1.5625rem] mt-[0.5625rem] mb-[1.375rem] text-[hsl(231,11%,63%)]">
            Please provide your name, email address, and phone number.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name Field */}
            <div className="relative">
              <label className="text-[hsl(213,96%,18%)]" htmlFor="name">
                Name
              </label>
              {isSubmitted && errors.name && (
                <p className="absolute top-0 right-0 text-xs font-medium text-[hsl(354,84%,57%)]">
                  {errors.name}
                </p>
              )}
              <input
                className={`w-full mt-[0.1875rem] text-[0.9375rem] font-[500] text-[hsl(213,96%,18%)] p-[0.6875rem_1rem_0.75rem] border border-[hsl(231,11%,63%)] rounded-[4px] ${
                  isSubmitted && errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                type="text"
                id="name"
                name="name"
                value={contact.name}
                onChange={handleChange}
                placeholder="e.g Stephen King"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="text-[hsl(213,96%,18%)]" htmlFor="email">
                Email Address
              </label>
              {isSubmitted && errors.email && (
                <p className="absolute top-0 right-0 text-xs font-medium text-[hsl(354,84%,57%)]">
                  {errors.email}
                </p>
              )}
              <input
                className={`w-full mt-[0.1875rem] text-[0.9375rem] font-[500] text-[hsl(213,96%,18%)] p-[0.6875rem_1rem_0.75rem] border border-[hsl(231,11%,63%)] rounded-[4px] ${
                  isSubmitted && errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                type="text"
                id="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="e.g stephenking@gmail.com"
              />
            </div>

            {/* Phone Number Field */}
            <div className="relative">
              <label className="text-[hsl(213,96%,18%)]" htmlFor="number">
                Phone Number
              </label>
              {isSubmitted && errors.number && (
                <p className="absolute top-0 right-0 text-xs font-medium text-[hsl(354,84%,57%)]">
                  {errors.number}
                </p>
              )}
              <input
                className={`w-full mt-[0.1875rem] text-[0.9375rem] font-[500] text-[hsl(213,96%,18%)] p-[0.6875rem_1rem_0.75rem] border border-[hsl(231,11%,63%)] rounded-[4px] ${
                  isSubmitted && errors.number ? 'border-red-500' : 'border-gray-300'
                }`}
                type="text"
                id="number"
                name="number"
                value={contact.number}
                onChange={handleChange}
                placeholder="eg. +0012345667"
              />
            </div>
            <div className="flex items-center justify-between bg-white p-4 shadow-none">
              {/* The button is always clickable, validation occurs on click */}
              <NextStepBtn1 onClick={nextStep} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
