const patternTimezone = /^(\+|-)?(\d{2}):?(\d{2})?$/;

const INVALID_ZONE_FORMAT = 'Invalid timezone zone format';

class DateTz extends Date {
	/**
	 * Wrapper above js native Date object for using timezone time instead of local (for current machine)
	 * @param {string} zone - {@link zone}
	 * @param {*} args - any data to initialize  native {@link date} object
	 * @example
	 * import DateTz from 'DateTz';
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
	 * import DateTz from 'DateTz';
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
	 *
	 * @return {number}
	 */
	getTzDate() {
		return this.__shifted.getUTCDate();
	}

	/**
	 *
	 * @return {number}
	 */
	getTzDay() {
		return this.__shifted.getUTCDay();
	}

	/**
	 *
	 * @return {number}
	 */
	getTzFullYear() {
		return this.__shifted.getUTCFullYear();
	}

	/**
	 *
	 * @return {number}
	 */
	getTzHours() {
		return this.__shifted.getUTCHours();
	}

	/**
	 *
	 * @return {number}
	 */
	getTzMilliseconds() {
		return this.__shifted.getUTCMilliseconds();
	}

	/**
	 *
	 * @return {number}
	 */
	getTzMinutes() {
		return this.__shifted.getUTCMinutes();
	}

	/**
	 *
	 * @return {number}
	 */
	getTzMonth() {
		return this.__shifted.getUTCMonth();
	}

	/**
	 *
	 * @return {number}
	 */
	getTzSeconds() {
		return this.__shifted.getUTCSeconds();
	}

	/**
	 *
	 * @return {number}
	 */
	getTzTimezoneOffset() {
		return -(this.__h * 60 + this.__m);
	}

	/**
	 *
	 */
	setTzDate() {
		const _shifted = this.__shifted;
		_shifted.setUTCDate.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 *
	 */
	setTzFullYear() {
		const _shifted = this.__shifted;
		_shifted.setUTCFullYear.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 *
	 */
	setTzHours() {
		const _shifted = this.__shifted;
		_shifted.setUTCHours.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 *
	 */
	setTzMilliseconds() {
		const _shifted = this.__shifted;
		_shifted.setUTCMilliseconds.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 *
	 */
	setTzMinutes() {
		const _shifted = this.__shifted;
		_shifted.setUTCMinutes.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 *
	 */
	setTzMonth() {
		const _shifted = this.__shifted;
		_shifted.setUTCMonth.apply(_shifted, arguments);
		this.__shifted = _shifted;
	}

	/**
	 *
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

module.exports = {
	'default': DateTz,
	INVALID_ZONE_FORMAT: INVALID_ZONE_FORMAT
};
