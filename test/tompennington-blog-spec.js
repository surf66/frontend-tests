var assert = require("assert"),
    testConfig = require("./config/test-config.js"),
    blogPageObject = require("./page-objects/tompennington-blog.json"),
    baseUrl = testConfig.getBaseUrl();

describe("tompennington blog", function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999999;

  beforeEach(function() {
    client = testConfig.getWebdriver();
    client.init().url(baseUrl);
  });

  it("should have a title tag set", function(done) {
    client
      .getTitle(function(err, title) {
        expect(title).toEqual("Tom Pennington");
      })
      .call(done);
  });

  it("should show menu after clicking menu button", function(done) {
    client
      .isVisible(".nav").then(function(isVisible) {
        expect(isVisible).toBe(false);
      })
      .click(".menu-button").then(function() {
        this.isVisible(".nav").then(function(isVisible) {
          expect(isVisible).toBe(true);
        });
      })
      .call(done);
  });

  afterEach(function(done) {
    client.end(done);
  });
});
