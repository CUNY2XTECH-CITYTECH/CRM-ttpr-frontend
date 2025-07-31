import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

const initialSteps = [
  {
    key: "interests",
    label: "What are your interests?",
    hint: "This helps us personalize your experience.",
    icon: "🎯",
    options: [
      "Gaming",
      "Photography",
      "Volunteering",
      "Science Club",
      "Robotics",
      "Music",
      "Writing",
      "Sports",
      "Student Government",
      "Theatre/Drama",
      "Environmental Club",
      "Entrepreneurship",
      "Social Justice",
      "Finance & Investing",
      "Anime & Comics",
      "Esports",
      "Debate Team",
      "Cultural Clubs",
      "Hackathons",
      "Campus Events",
    ],
  },
  {
    key: "roles",
    label: "What job roles are you interested in?",
    hint: "We’ll connect you with mentors and jobs that match.",
    icon: "💼",
    options: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Analyst",
      "Data Scientist",
      "Cybersecurity Analyst",
      "UX/UI Designer",
      "Mobile App Developer",
      "Cloud Engineer",
      "Machine Learning Engineer",
      "Game Developer",
      "IT Support Specialist",
      "DevOps Engineer",
      "Product Manager",
      "Project Manager",
      "Systems Administrator",
      "AI Researcher",
      "Business Analyst",
      "Technical Writer",
      "Database Administrator",
    ],
  },
  {
    key: "skills",
    label: "What are your top skillsets?",
    hint: "Let us know your strengths!",
    icon: "🛠️",
    options: [
      "Python",
      "JavaScript",
      "Java",
      "C++",
      "HTML/CSS",
      "SQL",
      "React",
      "Node.js",
      "Figma",
      "Excel",
      "Canva",
      "Public Speaking",
      "Networking (Cisco)",
      "Linux",
      "Adobe Photoshop",
      "Machine Learning",
      "Git/GitHub",
      "Leadership",
      "Time Management",
      "Problem Solving",
    ],
  },
];

export default function StudentOnboarding() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    interests: [],
    roles: [],
    skills: [],
  });
  const [dynamicOptions, setDynamicOptions] = useState(
    initialSteps.map((s) => s.options)
  );
  const [customInput, setCustomInput] = useState("");
  const [isReview, setIsReview] = useState(false);

  const currentStep = initialSteps[step];
  const currentOptions = dynamicOptions[step];
  const selected = formData[currentStep.key];

  const toggleOption = (key, value) => {
    setFormData((prev) => {
      const selectedOptions = prev[key];
      if (selectedOptions.includes(value)) {
        return { ...prev, [key]: selectedOptions.filter((v) => v !== value) };
      } else if (selectedOptions.length < 5) {
        return { ...prev, [key]: [...selectedOptions, value] };
      }
      return prev;
    });
  };

  const addCustomOption = () => {
    const val = customInput.trim();
    if (val && !currentOptions.includes(val)) {
      const updatedOptions = [...currentOptions, val];
      const newDynamicOptions = [...dynamicOptions];
      newDynamicOptions[step] = updatedOptions;
      setDynamicOptions(newDynamicOptions);
      toggleOption(currentStep.key, val);
      setCustomInput("");
    }
  };

  const handleNext = () => {
    if (step < initialSteps.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsReview(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleRestart = () => {
    setFormData({ interests: [], roles: [], skills: [] });
    setDynamicOptions(initialSteps.map((s) => s.options));
    setStep(0);
    setIsReview(false);
    setCustomInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-3xl space-y-8">
      {!isReview ? (
        <>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-indigo-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / initialSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={initialSteps.length}
              role="progressbar"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2" id="question-label">
              <span aria-hidden="true">{currentStep.icon}</span> {currentStep.label}
              <div className="relative group ml-2 cursor-pointer" tabIndex={0}>
                <Info size={16} className="text-gray-400" aria-describedby="hint-tooltip" />
                <div
                  id="hint-tooltip"
                  role="tooltip"
                  className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"
                >
                  {currentStep.hint}
                </div>
              </div>
            </h2>
            <p className="text-sm text-gray-500">Pick up to 5</p>
          </div>

          <fieldset aria-labelledby="question-label" className="flex flex-wrap gap-2">
            {currentOptions.map((opt, i) => {
              const isSelected = selected.includes(opt);
              const isDisabled = !isSelected && selected.length >= 5;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleOption(currentStep.key, opt)}
                  disabled={isDisabled}
                  className={`px-4 py-1.5 rounded-full border text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isSelected
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected && <Check size={14} aria-hidden="true" />}
                  {opt}
                </button>
              );
            })}
          </fieldset>

          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Add your own..."
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomOption();
                }
              }}
              aria-label="Add your own option"
            />
            <button
              type="button"
              onClick={addCustomOption}
              disabled={!customInput.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>

          <div className="flex justify-between items-center mt-4">
            {step > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-sm text-gray-500 hover:text-black focus:outline-none focus:underline"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            <div className="flex gap-3 items-center">
              <span className="text-xs text-gray-400">{selected.length}/5 selected</span>
              <button
                type="button"
                disabled={selected.length === 0}
                onClick={handleNext}
                className={`px-6 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                  selected.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {step < initialSteps.length - 1 ? "Continue →" : "Finish 🎉"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">🎉 You're all set!</h2>
          <p className="text-gray-600">Here's what you told us:</p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-left">
            {initialSteps.map((s) => (
              <div key={s.key}>
                <h4 className="font-semibold text-gray-800 mb-1">{s.label}</h4>
                <ul className="space-y-1">
                  {formData[s.key].map((item, i) => (
                    <li key={i} className="bg-gray-100 px-3 py-1 rounded-lg">
                      {item}
                    </li>
                  ))}
                  {formData[s.key].length === 0 && (
                    <li className="text-gray-400 italic">No selection</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="text-blue-600 hover:underline text-sm mt-4 focus:outline-none"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
