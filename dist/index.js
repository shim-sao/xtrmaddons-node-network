"use strict"; // Import modules

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var os = require("os");
/**
 * Class Network manager.
 */


var Network = function Network() {
  _classCallCheck(this, Network);
};
/**
 * Method to get the main network interface by default.
 * 
 * @param {object} param0 adapterName : the adapter name.
 * 												num : numero of the interface.
 * 												key : the key to retreive.
 * 
 * @returns {string} 
 */


Network.getFromInterface = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$adapterName = _ref.adapterName,
      adapterName = _ref$adapterName === void 0 ? "Ethernet" : _ref$adapterName,
      _ref$num = _ref.num,
      num = _ref$num === void 0 ? 0 : _ref$num,
      _ref$key = _ref.key,
      key = _ref$key === void 0 ? "address" : _ref$key;

  var networkInterfaces = os.networkInterfaces();

  try {
    return networkInterfaces[adapterName][num][key];
  } catch (e) {// eslint-disable-next-line no-console
    // console.log(e.name + " " + e.message);
  }

  return "127.0.0.1";
};
/**
 * 
 */


Network.getWanIP = function () {
  var addrs = Network.addresses();

  for (var i = 0; i < addrs.length; i++) {
    if (!["192", "127"].includes(addrs[i].split(".")[0])) {
      return addrs[i];
    }
  }

  return null;
};
/**
 */


Network.getLanIP = function () {
  var addrs = Network.addresses();

  for (var i = 0; i < addrs.length; i++) {
    if (addrs[i].split(".")[0] == "192") {
      return addrs[i];
    }
  }

  return null;
};
/**
 */


Network.adapters = function () {
  var family = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "IPv4";
  var networkInterfaces = os.networkInterfaces();
  var keys = Object.keys(networkInterfaces);
  var ips = [];
  keys.forEach(function (k) {
    var adapt = networkInterfaces[k][networkInterfaces[k].length - 1];
    if (!family || family == adapt.family) ips.push(networkInterfaces[k][networkInterfaces[k].length - 1]);
  });
  return ips;
};
/**
 */


Network.addresses = function () {
  var family = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "IPv4";
  var adapters = Network.adapters(family);
  var ips = [];
  adapters.forEach(function (el) {
    ips.push(el.address);
  });
  return Network.sortAddresses(ips);
};
/**
 * 
 */


Network.sortAddresses = function (addresses) {
  addresses.sort(function (a, b) {
    var num1 = Number(a.split(".").map(function (num) {
      return num.padStart(3, "0");
    }).join(""));
    var num2 = Number(b.split(".").map(function (num) {
      return num.padStart(3, "0");
    }).join(""));
    return num1 - num2;
  });
  return addresses;
};

module.exports = exports = Network;