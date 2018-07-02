const patternTimezone = /^(\+|-)?(\d{2}):?(\d{2})?$/;

export const INVALID_ZONE_FORMAT = 'Invalid timezone zone format';

export default class DateTz {
	/**
	 * Wrapper above js native Date object for using timezone time instead of local (for current machine)
	 * @param {Date|Number|String} date
	 * @param {String} zone - {@link zone}
	 * @example
	 * import DateTz from 'DateTz';
	 * const date = new DateTz('2000-01-01T00:00:00.000Z', '+0300');
	 * i.toISOString(); // '2000-01-01T00:00:00.000Z'
	 */
	constructor(date, zone = '+00') {
		this._date = new Date(date);
		this.zone = zone;
	}

	/**
	 * @param {String} value - zone in {@link https://rfc2.ru/5322.rfc/print#p3.3 rfc2822} format
	 * @example
	 * import DateTz from 'DateTz';
	 * const i = new DateTz('2000-01-01T00:00:00.000Z');
	 * i.zone // '+0000';
	 * i.getHours(); // 0
	 * i.getUTCHours(); // 0
	 * i.zone = '+0300';
	 * i.zone; // '+0300'
	 * i.getHours(); // 3
	 * i.getUTCHours(); // 0
	 */
	set zone(value) {
		const result = patternTimezone.exec(value);
		if (result) {
			let [, sign = '+', h = '00', m = '00'] = result;
			this._h = Number.parseInt(`${sign}${h}`);
			this._m = Number.parseInt(`${sign}${m}`);
			this._zone = `${sign}${h}${m}`;
		} else {
			throw new Error(INVALID_ZONE_FORMAT);
		}
	}

	get zone() {
		return this._zone;
	}

	get _shifted() {
		const date = new Date(this._date);
		date.setUTCHours(date.getUTCHours() + this._h, date.getUTCMinutes() + this._m);
		return date;
	}

	set _shifted(value) {
		const date = value;
		const timestamp = date.setUTCHours(date.getUTCHours() - this._h, date.getUTCMinutes() - this._m);
		this._date = date;
		return timestamp;
	}

	getDate() {
		return this._shifted.getUTCDate();
	}

	getDay() {
		return this._shifted.getUTCDay();
	}

	getFullYear() {
		return this._shifted.getUTCFullYear();
	}

	getHours() {
		return this._shifted.getUTCHours();
	}

	getMilliseconds() {
		return this._shifted.getUTCMilliseconds();
	}

	getMinutes() {
		return this._shifted.getUTCMinutes();
	}

	getMonth() {
		return this._shifted.getUTCMonth();
	}

	getSeconds() {
		return this._shifted.getUTCSeconds();
	}

	getTime() {
		return this._date.getTime();
	}

	getTimezoneOffset() {
		return -(this._h * 60 + this._m);
	}

	getUTCDate() {
		return this._date.getUTCDate();
	}

	getUTCDay() {
		return this._date.getUTCDay();
	}

	getUTCFullYear() {
		return this._date.getUTCFullYear();
	}

	getUTCHours() {
		return this._date.getUTCHours();
	}

	getUTCMilliseconds() {
		return this._date.getUTCMilliseconds();

	}

	getUTCMinutes() {
		return this._date.getUTCMinutes();
	}

	getUTCMonth() {
		return this._date.getUTCMonth();
	}

	getUTCSeconds() {
		return this._date.getUTCSeconds();
	}

	setDate() {
		const _shifted = this._shifted;
		_shifted.setUTCDate.apply(_shifted, arguments);
		this._shifted = _shifted;
	}

	setFullYear() {
		const _shifted = this._shifted;
		_shifted.setUTCFullYear.apply(_shifted, arguments);
		this._shifted = _shifted;
	}

	setHours() {
		const _shifted = this._shifted;
		_shifted.setUTCHours.apply(_shifted, arguments);
		this._shifted = _shifted;
	}

	setMilliseconds() {
		const _shifted = this._shifted;
		_shifted.setUTCMilliseconds.apply(_shifted, arguments);
		this._shifted = _shifted;
	}

	setMinutes() {
		const _shifted = this._shifted;
		_shifted.setUTCMinutes.apply(_shifted, arguments);
		this._shifted = _shifted;
	}

	setMonth() {
		const _shifted = this._shifted;
		_shifted.setUTCMonth.apply(_shifted, arguments);
		this._shifted = _shifted;
	}

	setSeconds() {
		const _shifted = this._shifted;
		_shifted.setUTCSeconds.apply(_shifted, arguments);
		this._shifted = _shifted;
	}

	setTime() {
		return this._date.setTime.apply(this._date, arguments);
	}

	setUTCDate() {
		return this._date.setUTCDate.apply(this._date, arguments);
	}

	setUTCFullYear() {
		return this._date.setUTCFullYear.apply(this._date, arguments);
	}

	setUTCHours() {
		return this._date.setUTCHours.apply(this._date, arguments);
	}

	setUTCMilliseconds() {
		return this._date.setUTCMilliseconds.apply(this._date, arguments);
	}

	setUTCMinutes() {
		return this._date.setUTCMinutes.apply(this._date, arguments);
	}

	setUTCMonth() {
		return this._date.setUTCMonth.apply(this._date, arguments);
	}

	setUTCSeconds() {
		return this._date.setUTCSeconds.apply(this._date, arguments);
	}

	toDateString() {
		return this._date.toDateString.apply(this._date, arguments);
	}

	toISOString() {
		return this._date.toISOString.apply(this._date, arguments);
	}

	toJSON() {
		return this._date.toJSON.apply(this._date, arguments);
	}

	toLocaleDateString() {
		return this._date.toLocaleDateString.apply(this._date, arguments);
	}

	toLocaleString() {
		return this._date.toLocaleString.apply(this._date, arguments);
	}

	toLocaleTimeString() {
		return this._date.toLocaleTimeString.apply(this._date, arguments);
	}

	toString() {
		const _shifted = this._shifted;
		const options = {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			timeZone: 'UTC',
			hour12: false
		};

		let string = _shifted.toLocaleString('en-US', options);
		return `${string} GMT${this.zone}`;
	}

	toTimeString() {
		const _shifted = this._shifted;
		const options = {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			timeZone: 'UTC',
			hour12: false
		};
		let string = _shifted.toLocaleTimeString('en-US', options);
		return `${string} GTM${this.zone}`;
	}

	toUTCString() {
		return this._date.toUTCString.apply(this._date, arguments);
	}

	valueOf() {
		return this._date.valueOf.apply(this._date, arguments);
	}

	/**
	 npm install --save DateTz
	 @name Installation
	 */
}

DateTz.UTC = function (...args) {
	return new DateTz(Date.UTC(...args));
};

DateTz.now = function () {
	return new DateTz(Date.now());
};

DateTz.parse = function (...args) {
	return new DateTz(Date.parse(...args));
};
