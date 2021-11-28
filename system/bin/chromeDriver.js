'use strict';

var chromedriver = require('chromedriver');
var selenium = require('selenium-webdriver');

/**
 * Creates a Selenium WebDriver using Chrome as the browser
 * @returns {ThenableWebDriver} selenium web driver
 */
module.exports = function() {

    var driver = new selenium.Builder().withCapabilities({
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
            args: ['--headless', 'disable-extensions','--no-sandbox', '--disable-dev-shm-usage']
        },
        path: chromedriver.path
    }).build();

    driver.manage().window().maximize();

    return driver;
};