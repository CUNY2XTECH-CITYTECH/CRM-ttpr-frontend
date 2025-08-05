import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info } from "lucide-react";

const steps = [
  {
    key: "interests",
    label: "What are your interests?",
    placeholder: "Type your interests...",
  },
  {
    key: "jobRoles",
    label: "Which job roles are you interested in?",
    placeholder: "Type job roles...",
  },
  {
    key: "skillsets",
    label: "What skillsets do you have?",
    placeholder: "Type your skills...",
  },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    interests: [],
    jobRoles: [],
    skillsets: [],
  });
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !formData[steps[currentStep].key].includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        [steps[currentStep].key]: [...prev[steps[currentStep].key], trimmed],
      }));
      setInputValue("");
    }
  };

  const removeItem = (item) => {
    setFormData((prev) => ({
      ...prev,
      [steps[currentStep].key]: prev[steps[currentStep].key].filter(
        (i) => i !== item
      ),
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Form submitted:\n\n" + JSON.stringify(formData, null, 2));
      setIsSubmitting(false);
      setCurrentStep(0);
      setFormData({ interests: [], jobRoles: [], skillsets: [] });
      setInputValue("");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <motion.h2
        key={steps[currentStep].key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-4 flex items-center gap-2"
      >
        <Info size={24} /> {steps[currentStep].label}
      </motion.h2>

      <div className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={steps[currentStep].placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={steps[currentStep].label}
          disabled={isSubmitting}
        />
        <button
          onClick={addItem}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          aria-label={`Add ${steps[currentStep].key}`}
          disabled={isSubmitting}
        >
          Add
        </button>
      </div>

      <ul className="mb-6 space-y-2 min-h-[4rem]">
        <AnimatePresence>
          {formData[steps[currentStep].key].map((item) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between bg-gray-100 rounded px-3 py-2"
            >
              <span>{item}</span>
              <button
                onClick={() => removeItem(item)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Remove ${item}`}
                disabled={isSubmitting}
              >
                <Check size={20} />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0 || isSubmitting}
          className={`px-4 py-2 rounded-md ${
            currentStep === 0 || isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
          aria-disabled={currentStep === 0 || isSubmitting}
        >
          Previous
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={isSubmitting}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}
