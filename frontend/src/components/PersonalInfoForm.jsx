import FormInput from "./FormInput";

export default function PersonalInfoForm() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FormInput
          name="firstName"
          label="First Name"
          placeholder="e.g. Vishal"
        />
        <FormInput
          name="lastName"
          label="Last Name"
          placeholder="e.g. Verma"
        />
      </div>

      <FormInput
        name="dateOfBirth"
        label="Date of Birth"
        type="date"
        placeholder=""
      />
    </div>
  );
}