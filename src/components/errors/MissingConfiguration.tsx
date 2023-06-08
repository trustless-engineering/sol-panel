import warningIcon from "@/assets/icons/warning.svg";
import Image from "next/image";

interface MissingConfigurationErrorProps {
  message?: string;
}

export default function MissingConfigurationError({ message }: MissingConfigurationErrorProps): React.JSX.Element {
  return (
    <div className="container flex flex-col">
      <div className="alert alert-error mb-4 shadow-lg">
        <Image src={warningIcon} alt={message as string} height={16} />
        <div>
          <h3 className="font-bold">Error: </h3>
          <p className="text-sm">
            <strong>SOL Panel</strong> is not configured correctly. You must provide the following environment variables:
            <ul className="mt-4 list-inside list-disc">
              <li>
                <code className="font-bold text-primary">NEXT_PUBLIC_LATITUDE_API_KEY</code>
              </li>
            </ul>
          </p>
        </div>
        <button className="btn-xl btn">Reload Configuration</button>
      </div>
    </div>
  );
}
