export class Event {
	public _timestamp: string
	public timestamp: Date

	// type is EVENT_TYPE enum
	constructor(public eventType: string){
		this.timestamp = new Date();
		this._timestamp = this.timestamp.toJSON();
	}

	saveValues(){
		return [this.eventType, this._timestamp];
	}
}
