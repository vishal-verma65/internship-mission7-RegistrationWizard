export default function NavigationButtons({ currentStep, totalSteps, onNext, onBack,}) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={`flex items-center mt-8 pt-6 border-t border-utah-sand-dark ${isFirstStep ? 'justify-end' : 'justify-between'}`}>
      {!isFirstStep && (
        <button
          type="button"
          className="utah-btn-secondary"
          onClick={onBack}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      )}

      {isLastStep ? (
        <button type="submit" className="utah-btn-primary">
          Submit
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8L6.5 11.5L13 5"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          className="utah-btn-primary"
          onClick={onNext}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 4L10 8L6 12"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}