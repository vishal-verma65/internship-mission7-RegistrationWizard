# The Registration Wizard — UtahGen Live

A modern, responsive multi-step onboarding form built with React.js, Vite, and Tailwind CSS v4. Designed around the **UtahGen Live** theme — a warm desert-modern aesthetic inspired by Utah's red rock landscape meets sleek fintech UI.

---

## Preview

```
Step 1 — Personal Information   →   First Name, Last Name, Date of Birth
Step 2 — Account Details        →   Email, Password, Confirm Password
Step 3 — Review & Submit        →   Summary of all entered data + Submit
```

After successful submission, a polished **Success Screen** replaces the form.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React.js | ^18.3 | UI library |
| Vite | ^5.4 | Build tool & dev server |
| Tailwind CSS | ^4.0 | Utility-first styling via `@tailwindcss/vite` |
| React Hook Form | ^7.53 | Form state management |
| Zod | ^3.23 | Schema-based validation |
| @hookform/resolvers | ^3.9 | (installed, validation handled manually via `safeParse`) |

---

## Project Structure

```
registration-wizard/
├── index.html                  # HTML entry point (loads Google Fonts)
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite + Tailwind v4 plugin config
└── src/
    ├── main.jsx                # React 18 createRoot entry
    ├── App.jsx                 # Root component — step state, validation, navigation
    ├── index.css               # Tailwind v4 @theme config + UtahGen Live design system
    ├── schemas/
    │   └── formSchema.js       # Zod schemas: step1Schema, step2Schema, fullSchema
    └── components/
        ├── FormContainer.jsx   # Card shell wrapper
        ├── ProgressBar.jsx     # Step dots, connector lines, animated progress bar
        ├── StepHeader.jsx      # Step count label, title, subtitle, divider
        ├── NavigationButtons.jsx # Back and Next/Submit buttons
        ├── ErrorMessage.jsx    # Inline error with icon, shown under inputs
        ├── FormInput.jsx       # Reusable labeled text/date/email input
        ├── PasswordInput.jsx   # Password input with show/hide toggle
        ├── PersonalInfoForm.jsx # Step 1 — firstName, lastName, dateOfBirth
        ├── AccountDetailsForm.jsx # Step 2 — email, password, confirmPassword
        ├── ReviewSection.jsx   # Step 3 — read-only summary of all form values
        └── SuccessScreen.jsx   # Full-page success state after submission
```

---

## Getting Started

### 1. Clone or download the project

```bash
git clone <your-repo-url>
cd registration-wizard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

---

## How Validation Works

This project uses **manual Zod validation** instead of `zodResolver` — this approach gives full control and avoids the issue of `ZodError` being thrown into the console.

```
User clicks Next
      ↓
schema.safeParse(values)   ← never throws, always returns { success, error }
      ↓
  success?  → clearErrors() → advance to next step
  failure?  → setError(field, { message }) for each invalid field
      ↓
FormInput / PasswordInput read errors[name]?.message from formState
      ↓
ErrorMessage renders the message below the input
```

**Key points:**
- Validation only runs when **Next** is clicked — no live validation while typing
- Once errors are shown, they clear in real time as the user fixes each field (`reValidateMode: "onChange"`)
- Going **Back** clears all errors so the previous step looks clean
- Final **Submit** re-validates the full schema before accepting

---

## UtahGen Live Design System

All design tokens are defined inside `src/index.css` using Tailwind v4's `@theme {}` block. No `tailwind.config.js` or `postcss.config.js` needed.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-utah-terracotta` | `#C2502F` | Primary brand, buttons, active states |
| `--color-utah-terracotta-dark` | `#A03F22` | Button hover, completed steps |
| `--color-utah-amber` | `#F0A04B` | Progress bar gradient accent |
| `--color-utah-slate` | `#1E2A3A` | Headings, primary text |
| `--color-utah-slate-light` | `#4A6080` | Secondary text, back button |
| `--color-utah-cream` | `#FAF7F2` | Page background, input background |
| `--color-utah-sand` | `#F5E6D3` | Review row hover, step dot pending |
| `--color-utah-muted` | `#8A7B6E` | Placeholders, subtitles, labels |
| `--color-utah-error` | `#DC2626` | Validation error messages |
| `--color-utah-success` | `#16A34A` | Success screen badge |

### Typography

| Role | Font |
|---|---|
| Headings / Display | Playfair Display (serif) |
| Body / Labels / Buttons | DM Sans (sans-serif) |

### Reusable CSS Classes

| Class | Description |
|---|---|
| `.utah-bg` | Page background with subtle radial gradients |
| `.utah-card` | White card with shadow and border |
| `.utah-input` | Base input with focus ring and error state |
| `.utah-btn-primary` | Terracotta filled button with hover lift |
| `.utah-btn-secondary` | Ghost button with border |
| `.utah-label` | Small semi-bold field label |
| `.utah-error` | Red error text with warning icon |
| `.step-dot` | Circular step indicator (active / completed / pending) |
| `.progress-fill` | Animated gradient progress bar fill |
| `.review-row` | Label + value row for the review step |
| `.success-checkmark` | Animated gradient circle for success screen |
| `.step-enter` | Slide-in animation when a step mounts |

---

## Form Steps

### Step 1 — Personal Information
| Field | Validation |
|---|---|
| First Name | Required, min 2 characters |
| Last Name | Required, min 2 characters |
| Date of Birth | Required, must be a valid past date |

### Step 2 — Account Details
| Field | Validation |
|---|---|
| Email | Required, valid email format |
| Password | Required, min 8 characters |
| Confirm Password | Required, must exactly match Password |

### Step 3 — Review & Submit
- Displays all entered values in a clean read-only layout
- Password is masked with bullet characters
- Date of Birth is formatted to a human-readable string (e.g. May 15, 1995)

---

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `App.jsx` | Step state, form setup, validation logic, navigation handlers |
| `FormContainer` | Visual card shell — no logic |
| `ProgressBar` | Renders step dots, connectors, and animated fill bar |
| `StepHeader` | Shows "Step X of 3", title, and subtitle per step |
| `NavigationButtons` | Back + Next/Submit buttons — no validation logic |
| `ErrorMessage` | Renders one error string with an icon — returns null if no error |
| `FormInput` | Reads `errors[name]` from context, renders label + input + error |
| `PasswordInput` | Same as FormInput but with show/hide toggle state |
| `PersonalInfoForm` | Composes FormInput fields for step 1 |
| `AccountDetailsForm` | Composes FormInput + PasswordInput fields for step 2 |
| `ReviewSection` | Reads all values via `getValues()`, renders grouped summary |
| `SuccessScreen` | Full-page confirmation with animated checkmark and restart button |

---

## License

MIT — free to use and modify.