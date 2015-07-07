var assert                 = require("assert"),
    testConfig             = require("./config/test-config.js"),
    blogPageObject         = require("./page-objects/tompennington-blog.json"),
    baseUrl                = testConfig.getBaseUrl();

describe("tompennington blog", function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999999;

    beforeEach(function() {
        client = testConfig.getWebdriver();
        client.init();
    });

    it("should have a title tag set", function(done) {
        client
            .url(baseUrl)
            .getTitle(function(err, title) {
                expect(title).toEqual("Tom Pennington");
            })
            .call(done);
    });

    it("author link should link to the about page", function(done) {
        client
            .url(baseUrl)
            .click(blogPageObject.aboutLink)
            .url(function(err, res) {
                expect(res.value).toEqual("http://tompennington.co.uk/about-me/")
            })
            .call(done);
    });

    afterEach(function(done) {
        client.end(done);
    });
});
