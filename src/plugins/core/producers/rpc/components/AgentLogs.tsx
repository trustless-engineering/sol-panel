import { useAgentContext } from "@/contexts/AgentContext";
import { useEffect, useMemo, useRef, useState } from "react";

interface AgentLogsProps {
  url: string;
}
export default function AgentLogs({ url }: AgentLogsProps): React.JSX.Element {
  const [messages, setMessages] = useState<React.JSX.Element[]>([]);
  const [autoscroll] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  const buildMessage = ({ line }: { line: any }): React.JSX.Element => {
    return (
      <>
        <span className="px-2">&rarr;</span>
        <code className="text-xs">{line}</code>
      </>
    );
  };
  const { onAgentEvent } = useAgentContext();

  useMemo(() => {
    onAgentEvent("message", (event) => {
      if (event.type === "log") {
        setMessages((messages) => [...messages, buildMessage(event)].slice(-200));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (autoscroll) {
      if (endRef.current !== null) {
        endRef.current.scrollTop = endRef.current.scrollHeight;
      }
    }
  }, [messages, autoscroll]);

  return (
    <div className="flex h-96 flex-col items-start justify-start overflow-auto bg-base-200 p-2 pl-3">
      {messages.map((message, index) => {
        return <div key={index}>{message}</div>;
      })}
      <div ref={endRef} />
    </div>
  );
}
