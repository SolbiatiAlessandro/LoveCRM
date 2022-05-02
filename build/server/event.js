var Event = /** @class */ (function () {
    // type is EVENT_TYPE enum
    function Event(eventType) {
        this.eventType = eventType;
        this.timestamp = new Date();
        this._timestamp = this.timestamp.toJSON();
    }
    Event.prototype.saveValues = function () {
        return [this.eventType, this._timestamp];
    };
    return Event;
}());
export { Event };
