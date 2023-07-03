export interface Config {
	method:
		| 'accountSubscribe'
		| 'logsSubscribe'
		| 'programSubscribe'
		| 'signatureSubscribe'
		| 'slotSubscribe'
		| 'blockSubscribe'
		| 'slotsUpdatesSubscribe'
		| 'voteSubscribe';
}
