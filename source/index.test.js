require('babel-core/register');
require('babel-polyfill');

const expect = require('chai').expect;

const Class = require('./index').default;
const {INVALID_ZONE_FORMAT} = require('./index');

describe('initialization', function () {

	it('Date', async function () {
		let i = new Class(new Date('2000-01-01T00:00:00.000Z'), '+03');
		expect(typeof i).to.equal('object');
	});

	it('Number', async function () {
		let i = new Class(946684800000, '12');
		expect(typeof i).to.equal('object');
	});

	it('String', async function () {
		let i = new Class('2000-01-01T00:00:00.000Z', '-01');
		expect(typeof i).to.equal('object');
	});

	describe(INVALID_ZONE_FORMAT, function () {

		it('0', async function () {
			expect(() => new Class(new Date('2000-01-01T00:00:00.000Z', '')).to.throw(INVALID_ZONE_FORMAT));
		});

		it('1', async function () {
			expect(() => new Class(new Date('2000-01-01T00:00:00.000Z', '1')).to.throw(INVALID_ZONE_FORMAT));
		});

		it('2', async function () {
			expect(() => new Class(new Date('2000-01-01T00:00:00.000Z', 'd1')).to.throw(INVALID_ZONE_FORMAT));
		});

		it('3', async function () {
			expect(() => new Class(new Date('2000-01-01T00:00:00.000Z', '603')).to.throw(INVALID_ZONE_FORMAT));
		});

		it('4', async function () {
			expect(() => new Class(new Date('2000-01-01T00:00:00.000Z', '6d03')).to.throw(INVALID_ZONE_FORMAT));
		});

		it('5', async function () {
			expect(() => new Class(new Date('2000-01-01T00:00:00.000Z', '+12345')).to.throw(INVALID_ZONE_FORMAT));
		});

	});
});

describe('methods', function () {
	it('setMilliseconds', async function () {
		const i = new Class('2000-01-01T00:00:00.000Z', '06');
		i.setMilliseconds(15);
		expect(i.getMilliseconds()).to.equal(15);
		expect(i.getUTCMilliseconds()).to.equal(15);
	});

	it('setMilliseconds. negative zone', async function () {
		const i = new Class('2000-01-01T00:00:00.000Z', '-06');
		i.setMilliseconds(15);
		expect(i.getMilliseconds()).to.equal(15);
		expect(i.getUTCMilliseconds()).to.equal(15);
	});

	it('setSeconds', async function () {
		const i = new Class('2000-01-01T00:00:00.000Z', '06');
		i.setSeconds(15);
		expect(i.getSeconds()).to.equal(15);
		expect(i.getUTCSeconds()).to.equal(15);
	});

	it('setSeconds. negative zone', async function () {
		const i = new Class('2000-01-01T00:00:00.000Z', '-06');
		i.setSeconds(15);
		expect(i.getSeconds()).to.equal(15);
		expect(i.getUTCSeconds()).to.equal(15);
	});

	it('setMinutes. negative zone', async function () {
		const i = new Class('2000-01-01T06:00:00.000Z', '-0603');
		i.setMinutes(15);
		expect(i.getMinutes()).to.equal(15);
		expect(i.getUTCMinutes()).to.equal(18);
	});

	it('setHours', async function () {
		const i = new Class('2000-01-01T00:00:00.000Z', '06');
		i.setHours(12);
		expect(i.getHours()).to.equal(12);
		expect(i.getUTCHours()).to.equal(6);
	});

	it('setHours. negative zone', async function () {
		const i = new Class('2000-01-01T06:00:00.000Z', '-06');
		const q = i.setHours(0);
		expect(i.getHours()).to.equal(0);
		expect(i.getUTCHours()).to.equal(6);
	});

	it('setDate', async function () {
		const i = new Class('2000-01-10T00:00:00.000+06:00', '06');
		i.setDate(12);
		expect(i.getDate()).to.equal(12);
		expect(i.getUTCDate()).to.equal(11);
	});

	it('setDate. negative zone', async function () {
		const i = new Class('2000-01-10T20:00:00.000-06:00', '-06');
		i.setDate(12);
		expect(i.getDate()).to.equal(12);
		expect(i.getUTCDate()).to.equal(13);
	});

	it('getDay', async function () {
		const i = new Class('2000-01-10T00:00:00.000+06:00', '06');
		i.setDate(12);
		expect(i.getDay()).to.equal(3);
		expect(i.getUTCDay()).to.equal(2);
	});

	it('getDay. negative zone', async function () {
		const i = new Class('2000-01-10T20:00:00.000-06:00', '-06');
		i.setDate(12);
		expect(i.getDay()).to.equal(3);
		expect(i.getUTCDay()).to.equal(4);
	});

	it('setMonth', async function () {
		const i = new Class('2000-01-01T00:00:00.000+06:00', '06');
		i.setMonth(5);
		expect(i.getMonth()).to.equal(5);
		expect(i.getUTCMonth()).to.equal(4);
	});

	it('setMonth. negative zone', async function () {
		const i = new Class('2000-01-30T20:00:00.000-06:00', '-06');
		i.setMonth(5);
		expect(i.getMonth()).to.equal(5);
		expect(i.getUTCMonth()).to.equal(6);
	});

	it('setFullYear', async function () {
		const i = new Class('2000-01-01T00:00:00.000+06:00', '06');
		i.setFullYear(2002);
		expect(i.getFullYear()).to.equal(2002);
		expect(i.getUTCFullYear()).to.equal(2001);
	});

	it('setFullYear. negative zone', async function () {
		const i = new Class('2000-12-31T20:00:00.000-06:00', '-06');
		i.setFullYear(2001);
		expect(i.getFullYear()).to.equal(2001);
		expect(i.getUTCFullYear()).to.equal(2002);
	});

	it('setTime', async function () {
		const i = new Class('2000-01-01T00:00:00.000+06:00', '06');
		i.setTime(946684800000);
		expect(i.getTime()).to.equal(946684800000);
	});

	it('getTimezoneOffset', async function () {
		const i = new Class('2000-01-01T00:00:00.000+06:00', '1206');
		i.setMonth(5);
		expect(i.getTimezoneOffset()).to.equal(-726);
	});

	it('getTimezoneOffset. negative zone', async function () {
		const i = new Class('2000-01-30T20:00:00.000-06:00', '-0507');
		i.setMonth(5);
		expect(i.getTimezoneOffset()).to.equal(307);
	});

	it('toDateString', async function () {
		const i = new Class('2000-01-30T20:00:00.000-06:00', '-0507');
		i.setDate(31);
		expect(i.toDateString()).to.equal('Tue Feb 01 2000');
	});

	it('toISOString', async function () {
		const i = new Class('2000-01-30T20:00:00.000-06:00', '-0507');
		i.setDate(31);
		expect(i.toISOString()).to.equal('2000-02-01T02:00:00.000Z');
	});

	it('toJSON', async function () {
		const i = new Class('2000-01-30T20:00:00.000-06:00', '-0507');
		i.setDate(31);
		expect(i.toJSON()).to.equal('2000-02-01T02:00:00.000Z');
	});

	it('toLocaleDateString', async function () {
		const i = new Class('2000-01-31T20:00:00.000-06:00');
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			timeZone: 'UTC'
		};
		expect(i.toLocaleDateString('en-US', options)).to.equal('Tuesday, February 1, 2000, 2:00 AM');
	});

	it('toLocaleString', async function () {
		const i = new Class('2000-01-31T20:00:00.000-06:00');
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			timeZone: 'UTC'
		};
		expect(i.toLocaleString('en-US', options)).to.equal('Tuesday, February 1, 2000, 2:00 AM');
	});

	it('toLocaleTimeString', async function () {
		const i = new Class('2000-01-31T20:00:00.000-06:00');
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			timeZone: 'UTC'
		};
		expect(i.toLocaleTimeString('en-US', options)).to.equal('Tuesday, February 1, 2000, 2:00 AM');
	});

	it('toString', async function () {
		const i = new Class('2000-01-31T20:00:00.000-06:00', '-06');
		expect(i.toString()).to.equal('Mon, Jan 31, 2000, 20:00:00 GMT-0600');
	});

	it('toTimeString', async function () {
		const i = new Class('2000-01-31T20:00:00.000-06:00', '-06');
		expect(i.toTimeString()).to.equal('20:00:00 GTM-0600');
	});

	it('toUTCString', async function () {
		const i = new Class('2000-01-31T20:00:00.000-06:00');
		expect(i.toUTCString()).to.equal('Tue, 01 Feb 2000 02:00:00 GMT');
	});

	it('valueOf', async function () {
		const i = new Class('2000-01-31T20:00:00.000-06:00');
		expect(i.valueOf()).to.equal(949370400000);
	});
});

describe('static methods', function () {

	it('UTC', async function () {
		const i = Class.UTC(2000, 11, 31, 23, 2);
		expect(i.getUTCFullYear()).to.equal(2000);
		expect(i.getUTCMonth()).to.equal(11);
		expect(i.getUTCDate()).to.equal(31);
		expect(i.getUTCHours()).to.equal(23);
		expect(i.getUTCMinutes()).to.equal(2);
	});

	it('now', async function () {
		const i = Class.now();
		const nowDate = new Date();

		expect(i.getUTCFullYear()).to.equal(nowDate.getUTCFullYear());
		expect(i.getUTCMonth()).to.equal(nowDate.getUTCMonth());
		expect(i.getUTCDate()).to.equal(nowDate.getUTCDate());
		expect(i.getUTCHours()).to.equal(nowDate.getUTCHours());
		expect(i.getUTCMinutes()).to.equal(nowDate.getUTCMinutes());
	});

	it('parse', async function () {
		const i = Class.parse('Aug 9, 1995');
		expect(i.getUTCFullYear()).to.equal(1995);
		expect(i.getUTCMonth()).to.equal(7);
		expect(i.getUTCDate()).to.equal(8);
	});

	it('zone change', async function () {
		const i = new Class('2000-01-01T00:00:00.000Z');
		expect(i.zone).to.equal('+0000');
		expect(i.getHours()).to.equal(0);
		expect(i.getUTCHours()).to.equal(0);

		i.zone = '+0300';
		expect(i.zone).to.equal('+0300');
		expect(i.getHours()).to.equal(3);
		expect(i.getUTCHours()).to.equal(0);

		i.setHours(5);
		expect(i.getHours(5)).to.equal(5);
		expect(i.getUTCHours()).to.equal(2);

		i.setUTCHours(5);
		expect(i.getHours(5)).to.equal(8);
		expect(i.getUTCHours()).to.equal(5);

		i.zone = '-0200';
		expect(i.zone).to.equal('-0200');
		expect(i.getHours()).to.equal(3);
		expect(i.getUTCHours()).to.equal(5);
	});

});
