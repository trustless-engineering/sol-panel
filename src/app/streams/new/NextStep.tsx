import { type Producer } from "@prisma/client";
import { sizeFormatter } from "human-readable";
import { AiOutlineRight as NextIcon, AiOutlinePlusCircle as PlusIcon } from "react-icons/ai";

export default function NextStep({ producer }: { producer: Producer }): React.JSX.Element {
  const formatSize = sizeFormatter({
    std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
  });

  if (producer !== null && producer === undefined) {
    return <></>;
  }

  return (
    <div className="next-step flex flex-col items-center h-full group">
      <div className="flex flex-row items-center justify-items-stretch justify-between rounded-lg pr-5 mb-3 group-hover:bg-base-100 group-hover:shadow-xl group-hover:border-2 border-primary">
        <NextIcon className="text-8xl text-primary-content justify-self-start" />
        <PlusIcon className="text-3xl text-success group-hover:visible invisible" />
      </div>
      <span className="text-primary-content text-sm">~{producer.eventsPerSecond} events/s</span>
      <span className="text-accent text-xs">(~{formatSize(producer.averageEventSize)}/event)</span>
    </div>
  );
}
