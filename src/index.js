"use strict";

// Import modules
const os = require("os");

/**
 * Class Network manager.
 */
const Network = class Network { };

/**
 * Method to get the main network interface by default.
 * 
 * @param {object} param0 adapterName : the adapter name.
 * 												num : numero of the interface.
 * 												key : the key to retreive.
 * 
 * @returns {string} 
 */
Network.getFromInterface = function({adapterName = "Ethernet", num = 0, key = "address"} = {}) {
	const networkInterfaces = os.networkInterfaces();
	try {
		return networkInterfaces[adapterName][num][key];
	} catch (e) {
		// eslint-disable-next-line no-console
		// console.log(e.name + " " + e.message);
	}
	return "127.0.0.1";
};

/**
 * 
 */
Network.getWanIP = function() {
	const addrs = Network.addresses();
	for(let i = 0; i < addrs.length; i++) {
		if(!["192", "127"].includes(addrs[i].split(".")[0])) {
			return addrs[i];
		}
	}
	return null;
};

/**
 */
Network.getLanIP = function() {
	const addrs = Network.addresses();
	for(let i = 0; i < addrs.length; i++) {
		if(addrs[i].split(".")[0] == "192") {
			return addrs[i];
		}
	}
	return null;
};

/**
 */
Network.adapters = function(family = "IPv4") {
	const networkInterfaces = os.networkInterfaces();
	const keys = Object.keys(networkInterfaces);
	const ips = [];

	keys.forEach(k => {
		const adapt = networkInterfaces[k][networkInterfaces[k].length - 1];
		if(!family || family == adapt.family)
			ips.push(networkInterfaces[k][networkInterfaces[k].length - 1]);
	});

	return ips;
};

/**
 */
Network.addresses = function(family = "IPv4") {
	const adapters = Network.adapters(family);
	const ips = [];
	adapters.forEach(el => {
		ips.push(el.address);
	});
	return Network.sortAddresses(ips);
};

/**
 * 
 */
Network.sortAddresses = function(addresses) {
	addresses
		.sort((a, b) => {
			const num1 = Number(a.split(".").map((num) => num.padStart(3, "0")).join(""));
			const num2 = Number(b.split(".").map((num) => num.padStart(3, "0")).join(""));
			return num1-num2;
		});

	return addresses;
};

module.exports = exports = Network;
