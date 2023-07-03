'use client';

import { createContext, useContext, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { EventEmitter } from 'events';

const WS_URL = 'ws://[::1]:8910';

interface AgentContextProps {
	connected: boolean;
	url: string;
	setUrl: (url: string) => void;
	onAgentEvent: (event: string, listener: (...args: any[]) => void) => void;
}

const AgentContext = createContext<AgentContextProps>({
	url: WS_URL,
	connected: false,
	onAgentEvent: (event: string, listener: (...args: any[]) => void) => {
		console.log('default emitter event, something is broken');
	},
	setUrl: (url: string) => {},
});

export const AgentContextProvider = ({ children }: any): React.JSX.Element => {
	const [emitter] = useState(new EventEmitter());
	const [connected, setConnected] = useState(false);
	const [url, setUrl] = useState(WS_URL);

	useWebSocket(url, {
		share: true,
		reconnectInterval: 5000,
		onOpen: () => {
			setConnected(true);
			console.log('sp-agent connection established');
		},
		onClose: () => {
			setConnected(false);
			console.log('sp-agent connection closed');
		},
		onError: (event) => {
			event.stopPropagation();
			if (event.type === 'close') {
				setConnected(false);
			}
		},
		onReconnectStop: () => {
			console.log('could not connect to sp-agent, giving up');
		},
		onMessage: (event) => {
			emitter.emit('message', JSON.parse(event.data));
		},
		shouldReconnect: (closeEvent) => true,
	});

	const onAgentEvent = (event: string, listener: (...args: any[]) => void): void => {
		console.log('adding emitter listener', event);
		console.log('emitter listeners before', emitter.listenerCount(event));
		emitter.on(event, listener);
		console.log('emitter listeners before', emitter.listenerCount(event));
	};

	return <AgentContext.Provider value={{ connected, url, setUrl, onAgentEvent }}>{children}</AgentContext.Provider>;
};

export const useAgentContext = (): AgentContextProps => useContext(AgentContext);
