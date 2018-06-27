require('babel-core/register');
require('babel-polyfill');

const expect = require('chai').expect;

const Class = require('./index').default;

describe('initialization', function () {

	it('Number', async function () {
		let i = new Class(946684800000, 12);
	});

	it('String', async function () {
		let i = new Class('2000-01-01T00:00:00.000Z', -1);
	});

	it('Date', async function () {
		let i = new Class(new Date('2000-01-01T00:00:00.000Z', 3));
	});
});

describe('static methods', function () {

	it('now', async function () {
		const i = Class.now();
		console.log('DEBUG:index.test.js():29 =>', i);
	});

});


describe('methods', function () {

	it('getHours', async function () {
		const i = new Class('2000-01-01T18:00:00.000Z', 12);
		expect(i.getHours()).to.equal(6);
		expect(i.getDate()).to.equal(2);
	});

});
