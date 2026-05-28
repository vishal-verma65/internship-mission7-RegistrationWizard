import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";

export default function AccountDetailsForm() {
  return (
    <div>
      <FormInput
        name="email"
        label="Email Address"
        type="email"
        placeholder="e.g. vishal@example.com"
      />

      <PasswordInput
        name="password"
        label="Password"
        placeholder="Min. 8 characters"
      />

      <PasswordInput
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Re-enter your password"
      />
    </div>
  );
}