import Loading from "@/components/Loading";
import { useEffect } from "react";

interface PreflightStepProps {
  onSuccess: (settings: any) => void;
}

export default function PreflightStep({ onSuccess }: PreflightStepProps): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      onSuccess({
        preflight: true,
      });
    }, 250);
  });

  return (
    <div className="col-span-6">
      <Loading />
    </div>
  );
}
