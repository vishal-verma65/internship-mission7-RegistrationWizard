const stepLabels = ["Personal Info", "Account Details", "Review"];

export default function ProgressBar({ currentStep, totalSteps }) {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">

      <div className="flex items-center justify-between mb-4">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isPending = stepNumber > currentStep;

          const dotClass = isActive
            ? "step-dot active"
            : isCompleted
            ? "step-dot completed"
            : "step-dot pending";

          return (
            <div key={stepNumber} className="flex items-center flex-1">

              <div className="flex flex-col items-center gap-1">
                <div className={dotClass}>
                  {isCompleted ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M2.5 7L5.5 10L11.5 4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>

                {(() => {
                  const labelClass = isActive
                    ? "text-utah-terracotta"
                    : isCompleted
                    ? "text-utah-terracotta-dark"
                    : "text-utah-muted";
                  return (
                    <span className={`text-xs font-medium hidden sm:block ${labelClass} whitespace-nowrap`}>
                      {label}
                    </span>
                  );
                })()}
              </div>

              {stepNumber < totalSteps && (
                <div
                  className={`step-connector mx-2 mb-4 sm:mb-5 ${
                    isCompleted ? "completed" : ""
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="progress-track">
        {(() => {
          const fraction = (currentStep - 1) / (totalSteps - 1);
          if (fraction === 0) return <div className="progress-fill w-0" />;
          if (fraction === 1) return <div className="progress-fill w-full" />;

          // Try to represent as a Tailwind fractional width (denominators 2..6)
          for (const denom of [2, 3, 4, 5, 6]) {
            const num = Math.round(fraction * denom);
            if (Math.abs(fraction - num / denom) < 1e-6 && num > 0 && num < denom) {
              return <div className={`progress-fill w-${num}/${denom}`} />;
            }
          }

          // Fallback for odd denominators: inline width
          return <div className="progress-fill" style={{ width: `${progressPercent}%` }} />;
        })()}
      </div>

    </div>
  );
}