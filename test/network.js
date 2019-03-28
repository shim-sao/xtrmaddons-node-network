/* eslint-disable no-console */
/* eslint-disable no-undef */
"use strict";

// Import external modules.
require("module-alias/register");
const assert = require("assert");

// Import internal modules.
const Network = require("@src");

/* Defines */
const ethName = "Ethernet";				// name of the ethernet card.
const lanAddr = "192.168.1.12";   // IPV4 of the ethernet card on the LAN.
const wanAddr = "10.8.2.9";				// IPV4 of the ethernet card on the WAN.
const adaptIp = "192.168.109.33";  
const addrs = [ wanAddr, lanAddr, adaptIp, "127.0.0.1" ];

/* Test */
// Try to get addresses list
describe("Network.addresses() Mocha Array Test", function () {
	it(`should return [${addrs}] if the addresses list is correct.`, function(){
		const result = Network.addresses();
		assert.deepEqual(result, Network.sortAddresses(addrs));
	});
});

// Try to get first Wan addresses.
describe("Network.getWanIP() Mocha String Test", function () {
	it(`should return [${wanAddr}] if the WAN IP is correct.`, function(){
		const result = Network.getWanIP();
		assert.equal(result, wanAddr);
	});
});

// Try to get first Lan addresses.
describe("Network.getLanIP() Mocha String Test", function () {
	it(`should return [${lanAddr}] if the LAN IP is correct.`, function(){
		const result = Network.getLanIP();
		assert.equal(result, lanAddr);
	});
});

// Try to get the address by adapterName.
describe("Network.getFromInterface() Mocha String Test", function () {
	it(`should return [${lanAddr}] if the adapterName is correct.`, function(){
		const result = Network.getFromInterface();
		assert.equal(result, lanAddr);
	});

	it(`should return [127.0.0.1], the adapterName is incorrect.`, function(){
		const result = Network.getFromInterface({adapterName:"unknown"});
		assert.equal(result, "127.0.0.1");
	});

	it(`should return [192.168.1.12], the adapterName is correct.`, function(){
		const result = Network.getFromInterface({adapterName:"Ethernet"});
		assert.equal(result, "192.168.1.12");
	});
});
