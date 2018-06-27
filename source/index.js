export default class DateLocal {
	constructor(date, tz = 0) {
		this._date = new Date(date);
		this._tz = tz;
	}

	_toTZ() {
		const date = new Date(this._date);
		date.setUTCHours(date.getUTCHours() + this._tz);
		return date;
	}

	getDate() {
		return this._toTZ().getUTCDate();
	}

	getDay() {
		return this._toTZ().getUTCDay();
	}

	getFullYear() {
		return this._date.getFullYear();
	}

	getHours() {
		return this._toTZ().getUTCHours();
	}

	getMilliseconds() {
		return this._date.getMilliseconds();
	}

	getMinutes() {
		return this._date.getMinutes();
	}

	getMonth() {
		return this._toTZ().getUTCMonth();
	}

	getSeconds() {
		return this._date.getSeconds()
	}

	getTime() {
		return this._date.getTime()
	}

	getTimezoneOffset() {
		return this._toTZ().getTimezoneOffset();
	}

	getUTCDate() {
		return this._date.getUTCDate()
	}

	getUTCDay() {
		return this._date.getUTCDay()
	}

	getUTCFullYear() {
		return this._date.getUTCFullYear()
	}

	getUTCHours() {
		return this._date.getUTCHours()
	}

	getUTCMilliseconds() {
		return this._date.getUTCMilliseconds()

	}

	getUTCMinutes() {
		return this._date.getUTCMinutes()
	}

	getUTCMonth() {
		return this._date.getUTCMonth()
	}

	getUTCSeconds() {
		return this._date.getUTCSeconds()
	}

	getYear() {
		return this._date.getYear()
	}
// @todo как
	setDate(...args) {
		return this._date.setDate(...args)
	}

	setFullYear(...args) {
		return this._date.setFullYear(...args)
	}

	setHours(...args) {
		return this._date.setHours(...args)
	}

	setMilliseconds(...args) {
		return this._date.setMilliseconds(...args)
	}

	setMinutes(...args) {
		return this._date.setMinutes(...args)
	}

	setMonth(...args) {
		return this._date.setMonth(...args)
	}

	setSeconds(...args) {
		return this._date.setSeconds(...args)
	}

	setTime(...args) {
		return this._date.setTime(...args)
	}

	setUTCDate(...args) {
		return this._date.setUTCDate(...args)
	}

	setUTCFullYear(...args) {
		return this._date.setUTCFullYear(...args)
	}

	setUTCHours(...args) {
		return this._date.setUTCHours(...args)
	}

	setUTCMilliseconds(...args) {
		return this._date.setUTCMilliseconds(...args)
	}

	setUTCMinutes(...args) {
		return this._date.setUTCMinutes(...args)
	}

	setUTCMonth(...args) {
		return this._date.setUTCMonth(...args)
	}

	setUTCSeconds(...args) {
		return this._date.setUTCSeconds(...args)
	}

	setYear(...args) {
		return this._date.setYear(...args)
	}

	toDateString() {
		return this._date.toDateString()
	}

	toGMTString() {
		return this._date.toGMTString()
	}

	toISOString() {
		return this._date.toISOString()
	}

	toJSON() {
		return this._date.toJSON()
	}

	toLocaleDateString() {
		return this._date.toLocaleDateString()
	}

	toLocaleFormat() {
		return this._date.toLocaleFormat()
	}

	toLocaleString() {
		return this._date.toLocaleString()
	}

	toLocaleTimeString() {
		return this._date.toLocaleTimeString()
	}

	toSource() {
		return this._date.toSource()
	}

	toString() {
		return this._date.toString()
	}

	toTimeString() {
		return this._date.toTimeString()
	}

	toUTCString() {
		return this._date.toUTCString()
	}

	valueOf() {
		return this._date.valueOf()
	}

	/**
	 npm install --save DateLocal
	 @name Installation
	 */
}

DateLocal.UTC = function (...args) {
	return new DateLocal(Date.UTC(...args));
};

DateLocal.now = function (...args) {
	return new DateLocal(Date.now(...args));
};

DateLocal.parse = function (...args) {
	return new DateLocal(Date.parse(...args));
};
