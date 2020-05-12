const { config } = require("./wdio.shared.conf");

//
// ============
// Capabilities
// ============
// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
// time. Depending on the number of capabilities, WebdriverIO launches several test
// sessions. Within your capabilities you can overwrite the spec and exclude options in
// order to group specific specs to a specific capability.
//
// First, you can define how many instances should be started at the same time. Let's
// say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
// set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
// files and you set maxInstances to 10, all spec files will get tested at the same time
// and 30 processes will get spawned. The property handles how many capabilities
// from the same test should run tests.
config.specs = [
  './test/specs/*.spec.js',
];

config.capabilities = [
  {
    appium:'1.17.0',
    maxInstances: 1,
    platformName: "android",
    platformVersion: "9.0",
    automationName: "UiAutomator2",
    deviceName: "Galaxy S9 Plus HD API 26",
    unicodeKeyboard: true,
    autoGrantPermissions: true,
    noReset: true,
    app: 'android/app/build/outputs/apk/debug/app-debug.apk'
  }
];

exports.config = config;
