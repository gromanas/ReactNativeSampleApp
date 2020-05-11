exports.config = {
    // ====================
    // Runner and framework
    // Configuration
    // ====================
    runner: 'local',
    framework: 'jasmine',
    jasmineNodeOpts: {
        // Updated the timeout to 30 seconds due to possible longer appium calls
        // When using XPATH
        defaultTimeoutInterval: 90000,
        helpers: [require.resolve('@babel/register')],
    },
    sync: true,
    logLevel: 'silent',
    deprecationWarnings: true,
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    reporters: ['spec'],

    // ====================
    // Appium Configuration
    // ====================
    services: [
        [
            'appium',
            {
                // For options see
                // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
                args: {
                    '--relaxed-security': true,
                    '--allow-insecure': 'adb_shell',
                    '--log-timestamp': true
                    // For arguments see
                    // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
                },
                command: 'appium',
                logPath : './appium_logs.txt',
            },
        ],
    ],
    port: 4723,
};
