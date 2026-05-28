export default function SuccessScreen({ onRestart }) {
  return (
    <div className="utah-bg min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        <div className="text-center mb-8">
          <span className="font-display text-2xl font-semibold text-utah-terracotta"
          >
            UtahGen Live
          </span>
          <p className="text-sm mt-1 text-utah-muted" >
            Registration Wizard
          </p>
        </div>

        <div className="utah-card p-10 text-center">

          {/* Animated checkmark circle */}
          <div className="flex justify-center mb-6">
            <div className="success-checkmark">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 16.5L12.5 22L25 10"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="font-display text-2xl font-semibold mb-2 text-utah-slate">
            You're all set!
          </h1>

          <p className="text-sm leading-relaxed mb-8 text-utah-muted">
            Your registration has been submitted successfully. Welcome to UtahGen Live — we're glad to have you on board.
          </p>

          {/* Divider */}
          <div className="h-px w-full mb-8 bg-utah-sand-dark"/>

          {/* Completion badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 text-sm font-medium bg-utah-success-08 text-utah-success border-utah-success-20">
            <span className="w-2 h-2 rounded-full bg-utah-success animate-pulse"/>
            Registration Complete
          </div>

          {/* Restart button */}
          <div>
            <button
              type="button"
              className="utah-btn-secondary w-full justify-center"
              onClick={onRestart}
            >
              Start Over
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}