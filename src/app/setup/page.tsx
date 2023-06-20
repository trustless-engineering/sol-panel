"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import SetupHeader from "./header";

import Configure from "@/plugins/core/producers/rpc/Configure";
import Deploy from "@/plugins/core/producers/rpc/Deploy";
import Preflight from "@/plugins/core/producers/rpc/Preflight";

export interface ConfigurationStep {
  step: number;
  name: string;
  component: ReactNode;
}

export interface DeploymentSettings {
  flavor?: string;
  site?: string;
  [key: string]: any;
}

export interface SetupConfig {
  onStepComplete: (settings?: DeploymentSettings) => void;
  onStepFailure: (error: any) => void;
}

export default function Setup(): ReactNode {
  const [settings, setSettings] = useState<DeploymentSettings>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [currentComponent, setCurrentComponent] = useState<ReactNode>();

  const steps = useMemo<ConfigurationStep[]>(() => {
    const onStepComplete = (newSettings?: DeploymentSettings): void => {
      if (newSettings != null) {
        setSettings({ ...settings, ...newSettings });
      }
      setCurrentStep(currentStep + 1);
    };

    const onStepFailure = (error: any): void => {
      console.error(error);
    };

    return [
      {
        step: 0,
        name: "Preflight",
        component: <Preflight onSuccess={onStepComplete} />,
      },
      {
        step: 1,
        name: "Configure",
        component: <Configure onSuccess={onStepComplete} onFail={onStepFailure} />,
      },
      {
        step: 2,
        name: "Deploy",
        component: <Deploy onSuccess={onStepComplete} onFail={onStepFailure} site={settings.site} plan={settings.flavor} />,
      },
      {
        step: 3,
        name: "Enjoy",
        component: <Configure onSuccess={onStepComplete} onFail={onStepFailure} />,
      },
    ];
  }, [currentStep, settings]);

  useEffect(() => {
    const current = steps.filter((step) => {
      return step.step === currentStep;
    })[0];

    setCurrentComponent(current.component);
  }, [currentStep, steps]);

  return (
    <div className="mx-auto grid w-5/6 grid-cols-6 justify-items-stretch gap-4 p-4">
      <SetupHeader steps={steps} currentStep={currentStep} />
      {currentComponent}
    </div>
  );
}
