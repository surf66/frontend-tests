//set node environment
process.env.NODE_ENV = 'prod';

var webdriverio = require("webdriverio"),
    config = require("./env-config.json"),
    phantomjs = require('phantomjs'),
    binPath = phantomjs.path;

module.exports = {
    /**
     * Returns webdriver configuration
     */
    getWebdriver: function() {
        var client = {};
        client = webdriverio.remote({
          desiredCapabilities: {
            browserName: 'phantomjs',
            'phantomjs.binary.path': binPath,
            'phantomjs.cli.args': ['--ignore-ssl-errors=yes']
          }
        });
        return client;
    },
    /**
     * Returns base url from config.json based on node env
     */
    getBaseUrl: function() {
        var baseUrl = config[process.env.NODE_ENV];
        return baseUrl;
    }
};
