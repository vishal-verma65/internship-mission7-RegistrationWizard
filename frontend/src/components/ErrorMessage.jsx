export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p className="utah-error" role="alert">
      {/* Warning icon */}
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M6.5 4V7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="6.5" cy="9.25" r="0.625" fill="currentColor" />
      </svg>
      {message}
    </p>
  );
}