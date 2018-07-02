const expect = require('chai').expect;

const Class = require('./index');
const {INVALID_ZONE_FORMAT} = require('./index');

describe('initialization', function () {

	it('Date', async function () {
		let i = new Class('+03', new Date('2000-01-01T00:00:00.000Z'));
		expect(typeof i).to.equal('object');
	});

	it('Date. empty', async function () {
		let i = new Class('+03', new Date());
		expect(typeof i).to.equal('object');
	});

	it('Number', async function () {
		let i = new Class('12', 946684800000);
		expect(typeof i).to.equal('object');
	});

	it('Number. Row', async function () {
		let i = new Class('12', 2000, 6, 15, 12, 30, 5, 50);
		expect(i.getUTCFullYear()).to.equal(2000);
		expect(i.getUTCMonth()).to.equal(6);
		expect(typeof i).to.equal('object');
	});

	it('String', async function () {
		let i = new Class('-01', '2000-01-01T00:00:00.000Z');
		expect(typeof i).to.equal('object');
	});

	describe(INVALID_ZONE_FORMAT, function () {

		it('0', async function () {
			expect(() => new Class('', new Date('2000-01-01T00:00:00.000Z')).to.throw(INVALID_ZONE_FORMAT));
		});

		it('1', async function () {
			expect(() => new Class('1', new Date('2000-01-01T00:00:00.000Z')).to.throw(INVALID_ZONE_FORMAT));
		});

		it('2', async function () {
			expect(() => new Class('d1', new Date('2000-01-01T00:00:00.000Z')).to.throw(INVALID_ZONE_FORMAT));
		});

		it('3', async function () {
			expect(() => new Class('603', new Date('2000-01-01T00:00:00.000Z')).to.throw(INVALID_ZONE_FORMAT));
		});

		it('4', async function () {
			expect(() => new Class('6d03', new Date('2000-01-01T00:00:00.000Z')).to.throw(INVALID_ZONE_FORMAT));
		});

		it('5', async function () {
			expect(() => new Class('+12345', new Date('2000-01-01T00:00:00.000Z')).to.throw(INVALID_ZONE_FORMAT));
		});

	});
});

describe('methods', function () {
	it('setTzMilliseconds', async function () {
		const i = new Class('06', '2000-01-01T00:00:00.000Z');
		i.setTzMilliseconds(15);
		expect(i.getTzMilliseconds()).to.equal(15);
		expect(i.getUTCMilliseconds()).to.equal(15);
	});

	it('setTzMilliseconds. negative zone', async function () {
		const i = new Class('-06', '2000-01-01T00:00:00.000Z');
		i.setTzMilliseconds(15);
		expect(i.getTzMilliseconds()).to.equal(15);
		expect(i.getUTCMilliseconds()).to.equal(15);
	});

	it('setTzSeconds', async function () {
		const i = new Class('+06', '2000-01-01T00:00:00.000Z');
		i.setTzSeconds(15);
		expect(i.getTzSeconds()).to.equal(15);
		expect(i.getUTCSeconds()).to.equal(15);
	});

	it('setTzSeconds. negative zone', async function () {
		const i = new Class('-06', '2000-01-01T00:00:00.000Z');
		i.setTzSeconds(15);
		expect(i.getTzSeconds()).to.equal(15);
		expect(i.getUTCSeconds()).to.equal(15);
	});

	it('setTzMinutes. negative zone', async function () {
		const i = new Class('-0603', '2000-01-01T06:00:00.000Z');
		i.setTzMinutes(15);
		expect(i.getTzMinutes()).to.equal(15);
		expect(i.getUTCMinutes()).to.equal(18);
	});

	it('setTzHours', async function () {
		const i = new Class('+06', '2000-01-01T00:00:00.000Z');
		expect(i.getTzHours()).to.equal(6);
		i.setTzHours(12);
		expect(i.getTzHours()).to.equal(12);
		expect(i.getUTCHours()).to.equal(6);
	});

	it('setTzHours. negative zone', async function () {
		const i = new Class('-06', '2000-01-01T06:00:00.000Z');
		expect(i.getTzHours()).to.equal(0);
		i.setTzHours(2);
		expect(i.getTzHours()).to.equal(2);
		expect(i.getUTCHours()).to.equal(8);
	});

	it('setTzDate', async function () {
		const i = new Class('+06', '2000-01-10T00:00:00.000+06:00');
		i.setTzDate(12);
		expect(i.getTzDate()).to.equal(12);
		expect(i.getUTCDate()).to.equal(11);
	});

	it('setTzDate. negative zone', async function () {
		const i = new Class('-06', '2000-01-10T20:00:00.000-06:00');
		i.setTzDate(12);
		expect(i.getTzDate()).to.equal(12);
		expect(i.getUTCDate()).to.equal(13);
	});

	it('getTzDay', async function () {
		const i = new Class('+06', '2000-01-10T00:00:00.000+06:00');
		i.setTzDate(12);
		expect(i.getTzDay()).to.equal(3);
		expect(i.getUTCDay()).to.equal(2);
	});

	it('getTzDay. negative zone', async function () {
		const i = new Class('-06', '2000-01-10T20:00:00.000-06:00');
		i.setTzDate(12);
		expect(i.getTzDay()).to.equal(3);
		expect(i.getUTCDay()).to.equal(4);
	});

	it('setTzMonth', async function () {
		const i = new Class('+06', '2000-01-01T00:00:00.000+06:00');
		i.setTzMonth(5);
		expect(i.getTzMonth()).to.equal(5);
		expect(i.getUTCMonth()).to.equal(4);
	});

	it('setTzMonth. negative zone', async function () {
		const i = new Class('-06', '2000-01-30T20:00:00.000-06:00');
		i.setTzMonth(5);
		expect(i.getTzMonth()).to.equal(5);
		expect(i.getUTCMonth()).to.equal(6);
	});

	it('setTzFullYear', async function () {
		const i = new Class('+06', '2000-01-01T00:00:00.000+06:00');
		i.setTzFullYear(2002);
		expect(i.getTzFullYear()).to.equal(2002);
		expect(i.getUTCFullYear()).to.equal(2001);
	});

	it('setTzFullYear. negative zone', async function () {
		const i = new Class('-06', '2000-12-31T20:00:00.000-06:00');
		i.setTzFullYear(2001);
		expect(i.getTzFullYear()).to.equal(2001);
		expect(i.getUTCFullYear()).to.equal(2002);
	});

	it('getTzTimezoneOffset', async function () {
		const i = new Class('+1206', '2000-01-01T00:00:00.000+06:00');
		i.setTzMonth(5);
		expect(i.getTzTimezoneOffset()).to.equal(-726);
	});

	it('getTzTimezoneOffset. negative zone', async function () {
		const i = new Class('-0507', '2000-01-30T20:00:00.000-06:00');
		i.setTzMonth(5);
		expect(i.getTzTimezoneOffset()).to.equal(307);
	});

	it('toDateString', async function () {
		const i = new Class('-0507', '2000-01-30T20:00:00.000-06:00');
		i.setTzDate(31);
		expect(i.toDateString()).to.equal('Tue Feb 01 2000');
	});

	it('toISOString', async function () {
		const i = new Class('-0507', '2000-01-30T20:00:00.000-06:00');
		i.setTzDate(31);
		expect(i.toISOString()).to.equal('2000-02-01T02:00:00.000Z');
	});

	it('toJSON', async function () {
		const i = new Class('-0507', '2000-01-30T20:00:00.000-06:00');
		i.setTzDate(31);
		expect(i.toJSON()).to.equal('2000-02-01T02:00:00.000Z');
	});

	it('toLocaleDateString', async function () {
		const i = new Class(undefined, '2000-01-31T20:00:00.000-06:00');
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
		const i = new Class(undefined, '2000-01-31T20:00:00.000-06:00');
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
		const i = new Class('+00', '2000-01-31T20:00:00.000-06:00');
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

	it('toUTCString', async function () {
		const i = new Class('+00', '2000-01-31T20:00:00.000-06:00');
		expect(i.toUTCString()).to.equal('Tue, 01 Feb 2000 02:00:00 GMT');
	});

	it('valueOf', async function () {
		const i = new Class('+00', '2000-01-31T20:00:00.000-06:00');
		expect(i.valueOf()).to.equal(949370400000);
	});

	it('zone change', async function () {
		const i = new Class(undefined, '2000-01-01T00:00:00.000Z');
		expect(i.zone).to.equal('+0000');
		expect(i.getTzHours()).to.equal(0);
		expect(i.getUTCHours()).to.equal(0);

		i.zone = '+0300';
		expect(i.zone).to.equal('+0300');
		expect(i.getTzHours()).to.equal(3);
		expect(i.getUTCHours()).to.equal(0);

		i.setTzHours(5);
		expect(i.getTzHours(5)).to.equal(5);
		expect(i.getUTCHours()).to.equal(2);

		i.setUTCHours(5);
		expect(i.getTzHours(5)).to.equal(8);
		expect(i.getUTCHours()).to.equal(5);

		i.zone = '-0200';
		expect(i.zone).to.equal('-0200');
		expect(i.getTzHours()).to.equal(3);
		expect(i.getUTCHours()).to.equal(5);
	});

});

describe('static methods', function () {

	it('UTC', async function () {
		const i = Class.UTC(undefined, 2000, 11, 31, 23, 2);
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
		const i = Class.parse(undefined, 'Aug 9, 1995');
		expect(i.getUTCFullYear()).to.equal(1995);
		expect(i.getUTCMonth()).to.equal(7);
		expect(i.getUTCDate()).to.equal(8);
	});

});
