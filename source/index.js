const patternTimezone = /^(\+|-)?(\d{2}):?(\d{2})?$/;

const INVALID_ZONE_FORMAT = 'Invalid timezone zone format';

class DateTz extends Date {
	/**
	 * Wrapper above js native Date object for using timezone time instead of local (for current machine)
	 * @param {string} zone - {@link zone}
	 * @param {*} args - any data to initialize  native {@link date} object
	 * @example
	 * import DateTz from 'date-tz';
	 * const date = new DateTz('+0300', '2000-01-01T00:00:00.000Z');
	 * i.toISOString(); // '2000-01-01T00:00:00.000Z'
	 */
	constructor(zone = '+0000', ...args) {
		super(...args);
		this.zone = zone;
	}

	/**
	 * @param {String} value - zone in {@link https://rfc2.ru/5322.rfc/print#p3.3 rfc2822} format
	 * @example
	 * import DateTz from 'date-tz';
	 * const i = new DateTz('+0000', '2000-01-01T00:00:00.000Z');
	 * i.zone // '+0000';
	 * i.getTzHours(); // 0
	 * i.getUTCHours(); // 0
	 * i.zone = '+0300';
	 * i.zone; // '+0300'
	 * i.getTzHours(); // 3
	 * i.getUTCHours(); // 0
	 */
	set zone(value) {
		const result = patternTimezone.exec(value);
		if (result) {
			let [, sign = '+', h = '00', m = '00'] = result;
			this.__h = Number.parseInt(`${sign}${h}`);
			this.__m = Number.parseInt(`${sign}${m}`);
			this.__zone = `${sign}${h}${m}`;
		} else {
			throw new Error(`${INVALID_ZONE_FORMAT}. Got: ${value}`);
		}
	}

	get zone() {
		return this.__zone;
	}

	get __shifted() {
		const date = new Date(this);
		date.setUTCHours(
			date.getUTCHours() + this.__h,
			date.getUTCMinutes() + this.__m
		);
		return date;
	}

	set __shifted(value) {
		this.setUTCFullYear(
			value.getUTCFullYear(),
			value.getUTCMonth(),
			value.getUTCDate(),
		);

		this.setUTCHours(
			value.getUTCHours() - this.__h,
			value.getUTCMinutes() - this.__m,
			value.getUTCSeconds(),
			value.getUTCMilliseconds(),
		);
	}

	/**
	 * returns date in {@link zone}
	 * @return {number}
	 * @example
	 * import DateTz from 'date-tz';
	 * const i = new DateTz('+06', '2000-01-10T00:00:00.000+06:00');
	 * i.setTzDate(12);
	 * i.getTzDate(); // 12
	 * i.getUTCDate(); // 13
	 */
	getTzDate() {
		return this.__shifted.getUTCDate();
	}

	/**
	 * returns day of week in {@link zone}
	 * @return {number}
	 * @example
	 * import DateTz from 'date-tz';
	 * const i = new DateTz('06', '2000-01-10T00:00:00.000+06:00');
	 * i.setTzDate(12);
	 * i.getTzDay(); // 3
	 * i.getUTCDay(); // 2
	 */
	getTzDay() {
		return this.__shifted.getUTCDay();
	}

	/**
	 * returns year in {@link zone}
	 * @return {number}
	 * @example
	 * import DateTz from 'date-tz';
	 * const i = new DateTz('+06', '2000-01-01T00:00:00.000+06:00');
	 * i.setTzFullYear(2002);
	 * i.getTzFullYear(); // 2002
	 * i.getUTCFullYear(); // 2001
	 * */
	getTzFullYear() {
		return this.__shifted.getUTCFullYear();
	}

	/**
	 * returns hours in {@link zone}
	 * @return {number}
	 * @example
	 * import DateTz from 'date-tz';
	 * const i = new DateTz('-06', '2000-01-01T06:00:00.000Z');
	 * i.getTzHours(); // 0
	 * i.setTzHours(2);
	 * i.getTzHours(); // 2
	 * i.getUTCHours(); // 8;
	 */
	getTzHours() {
		return this.__shifted.getUTCHours();
	}

	/**
	 * returns milliseconds in {@link zone}
	 * @return {number}
	 * @example
	 * import DateTz from 'date-tz';
	 * const i = new DateTz('-06', '2000-01-01T00:00:00.000Z');
	 * i.setTzMilliseconds(15);
	 * i.getTzMilliseconds(); // 15
	 * i.getUTCMilliseconds(); // 15
	 */
	getTzMilliseconds() {
		return this.__shifted.getUTCMilliseconds();
	}

	/**
	 * returns minutes in {@link zone}
	 * @return {number}
	 * @example
	 * import DateTz from 'date-tz';
	 * const i = new DateTz('-0603', '2000-01-01T06:00:00.000Z');
	 * i.setTzMinutes(15);
	 * i.getTzMinutes(); // 15
	 * i.getUTCMinutes(); // 18
	 */
	getTzMinutes() {
		return this.__shifted.getUTCMinutes();
	}

	/**
	 * returns month in {@link zone}
	 * @return {number}
	 * @example
	 * import DateTz from 'date-tz';
	 * const i = new DateTz('-06', '2000-01-30T20:00:00.000-06:00');
	 * i.setTzMonth(5);
	 * i.getTzMonth(); // 5
	 * i.getUTCMonth(); // 6
	 */
	getTzMonth() {
		return this.__shifted.getUTCMonth();
	}

	/**
	 * returns seconds in {@link zone}
	 * @return {number}
	 * @example
	 * import DateTz from 'date-tz';
	 * const i = new DateTz('-06', '2000-01-01T00:00:00.000Z');
	 * i.setTzMilliseconds(15);
	 * i.getTzMilliseconds(); // 15
	 * i.getUTCMilliseconds() // 15
	 */
	getTzSeconds() {
		return this.__shifted.getUTCSeconds();
	}

	/**
	 * returns offset between {@link zone} and UTC
	 * @return {number}
	 * @example
	 * import DateTz from 'date-tz';
	 * i = new DateTz('-0507', '2000-01-30T20:00:00.000-06:00');
	 * i.getTzTimezoneOffset(); // 307
	 */
	getTzTimezoneOffset() {
		return -(this.__h * 60 + this.__m);
	}

	/**
	 * set date in {@link zone}
	 */
	setTzDate() {
		const _shifted = this.__shifted;
		_shifted.setUTCDate.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 * set year in {@link zone}
	 */
	setTzFullYear() {
		const _shifted = this.__shifted;
		_shifted.setUTCFullYear.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 * set hours in {@link zone}
	 */
	setTzHours() {
		const _shifted = this.__shifted;
		_shifted.setUTCHours.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 * set milliseconds in {@link zone}
	 */
	setTzMilliseconds() {
		const _shifted = this.__shifted;
		_shifted.setUTCMilliseconds.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 * set minutes in {@link zone}
	 */
	setTzMinutes() {
		const _shifted = this.__shifted;
		_shifted.setUTCMinutes.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 * set month in {@link zone}
	 */
	setTzMonth() {
		const _shifted = this.__shifted;
		_shifted.setUTCMonth.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 * set seconds in {@link zone}
	 */
	setTzSeconds() {
		const _shifted = this.__shifted;
		_shifted.setUTCSeconds.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 npm install --save DateTz
	 @name Installation
	 */
}

DateTz.UTC = function (zone, ...args) {
	return new DateTz(zone, Date.UTC(...args));
};

DateTz.now = function (zone) {
	return new DateTz(zone, Date.now());
};

DateTz.parse = function (zone, ...args) {
	return new DateTz(zone, Date.parse(...args));
};

module.exports = DateTz;
module.exports.INVALID_ZONE_FORMAT = INVALID_ZONE_FORMAT;
