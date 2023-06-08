import { type ConfigurationStep } from "./page";

export default function SetupHeader({ steps, currentStep }: { steps: ConfigurationStep[]; currentStep: number }): React.JSX.Element {
  return (
    <div className="header col-span-6 justify-self-center pb-8">
      <div className="flex flex-col items-center gap-4">
        <div className="prose-md prose">
          <h1>Setup</h1>
        </div>
        <div className="flex-1">
          <ul className="steps">
            {steps.map((step) => {
              if (step.step === 0) {
                return false;
              }
              return (
                <li className={`step ${step.step === currentStep ? "step-primary" : ""}`} key={step.step}>
                  {step.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
