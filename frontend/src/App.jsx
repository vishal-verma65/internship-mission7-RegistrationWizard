import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fullSchema, step1Schema, step2Schema } from "./schemas/formSchema";
import FormContainer from "./components/FormContainer";
import ProgressBar from "./components/ProgressBar";
import StepHeader from "./components/StepHeader";
import PersonalInfoForm from "./components/PersonalInfoForm";
import AccountDetailsForm from "./components/AccountDetailsForm";
import ReviewSection from "./components/ReviewSection";
import NavigationButtons from "./components/NavigationButtons";
import SuccessScreen from "./components/SuccessScreen";

const TOTAL_STEPS = 3;

const stepSchemas = [step1Schema, step2Schema, fullSchema];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleNext = async () => {
    const values = methods.getValues();
    const schema = stepSchemas[currentStep - 1];

    const result = schema.safeParse(values);

    if (result.success) {
      methods.clearErrors();
      setCurrentStep((prev) => prev + 1);
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          methods.setError(field, {
            type: "manual",
            message: messages[0],
          });
        }
      });
    }
  };

  const handleBack = () => {
    methods.clearErrors();
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = methods.getValues();
    const result = fullSchema.safeParse(values);

    if (result.success) {
      console.log("Form submitted:", result.data);
      setIsSubmitted(true);
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          methods.setError(field, {
            type: "manual",
            message: messages[0],
          });
        }
      });
    }
  };

  const handleRestart = () => {
    methods.reset();
    setCurrentStep(1);
    setIsSubmitted(false);
  };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (currentStep < TOTAL_STEPS) {
          handleNext();
        } else {
          handleSubmit(e);
        }
      }
    };

  if (isSubmitted) {
    return <SuccessScreen onRestart={handleRestart} />;
  }

  return (
    <div className="utah-bg min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">

        <div className="text-center mb-4 block sm:flex sm:items-center sm:justify-center gap-2 ">
          <span className="font-display text-2xl font-semibold text-utah-terracotta">
            UtahGen Live
          </span>
          <span className="text-lg mt-1 text-utah-muted" >
           - Registration Wizard
          </span>
        </div>

        <FormContainer>
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          <StepHeader currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit}  onKeyDown={handleKeyDown} noValidate>
              <div className="step-enter" key={currentStep}>
                {currentStep === 1 && <PersonalInfoForm />}
                {currentStep === 2 && <AccountDetailsForm />}
                {currentStep === 3 && <ReviewSection />}
              </div>

              <NavigationButtons
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                onNext={handleNext}
                onBack={handleBack}
              />
            </form>
          </FormProvider>
        </FormContainer>

      </div>
    </div>
  );
}