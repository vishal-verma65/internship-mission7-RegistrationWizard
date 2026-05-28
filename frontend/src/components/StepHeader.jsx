const stepContent = [
  {
    title: "Personal Information",
    subtitle: "Let's start with your basic details.",
  },
  {
    title: "Account Details",
    subtitle: "Set up your login credentials.",
  },
  {
    title: "Review & Submit",
    subtitle: "Everything look good? Go ahead and submit.",
  },
];

export default function StepHeader({ currentStep, totalSteps }) {
  const { title, subtitle } = stepContent[currentStep - 1];

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-utah-terracotta">
        Step {currentStep} of {totalSteps}
      </p>

      <h1 className="font-display text-2xl font-semibold leading-snug text-utah-slate" >
        {title}
      </h1>

      <p className="text-sm mt-1 text-utah-muted">
        {subtitle}
      </p>

      {/* Divider */}
      <div className="mt-4 h-px w-full bg-utah-sand-dark" />
    </div>
  );
}