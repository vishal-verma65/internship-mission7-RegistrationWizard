import { useFormContext } from "react-hook-form";

function ReviewRow({ label, value }) {
  return (
    <div className="review-row">
      <span className="text-sm font-medium text-utah-muted">
        {label}
      </span>
      <span className="text-sm font-semibold text-right text-utah-slate">
        {value}
      </span>
    </div>
  );
}

function ReviewGroup({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-utah-terracotta">
        {title}
      </p>
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}

export default function ReviewSection() {
  const { getValues } = useFormContext();
  const values = getValues();

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const maskPassword = (pwd) => {
    if (!pwd) return "—";
    return "•".repeat(pwd.length);
  };

  return (
    <div>
      <div className="flex items-start gap-3 rounded-lg p-4 mb-6 bg-utah-terracotta-06 border-utah-terracotta-15">
        {/* Info icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="text-utah-terracotta shrink-0 mt-px"
        >
          <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 8V13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="9" cy="5.5" r="0.875" fill="currentColor" />
        </svg>
        <p className="text-sm leading-relaxed text-utah-slate-mid">
          Please review your details below before submitting. Go back to make any changes.
        </p>
      </div>

      <ReviewGroup title="Personal Information">
        <ReviewRow
          label="First Name"
          value={values.firstName || "—"}
        />
        <ReviewRow
          label="Last Name"
          value={values.lastName || "—"}
        />
        <ReviewRow
          label="Date of Birth"
          value={formatDate(values.dateOfBirth)}
        />
      </ReviewGroup>

      <ReviewGroup title="Account Details">
        <ReviewRow
          label="Email Address"
          value={values.email || "—"}
        />
        <ReviewRow
          label="Password"
          value={maskPassword(values.password)}
        />
      </ReviewGroup>
    </div>
  );
}