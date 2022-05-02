export class Event {
	public type: string;  // EVENT_TYPE
	public _timestamp: string
	public timestamp: Date

	// type is EVENT_TYPE enum
	constructor(type: string){
		this.timestamp = new Date();
		this._timestamp = this.timestamp.toJSON();
	}

	saveValues(){
		return [this.type, this._timestamp];
	}
}
