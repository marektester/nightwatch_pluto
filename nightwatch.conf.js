const Services = {}; loadServices();

module.exports = {
  src_folders: ["./tests" ],
  page_objects_path: './lib/pages-objects',
  custom_commands_path:  './lib/custom-commands',
  custom_assertions_path: '',
  output_folder: "./reports",

  globals_path : './lib/data/globals.js',
  use_xpath: true,
  end_session_on_fail: false,
  skip_testcases_on_fail : false,
  disable_error_log: true,
  webdriver: {},
  test_workers: {},

  test_settings: {
    default: {
      launch_url: 'https://pluto-customer-web-app-staging.herokuapp.com/tailored-annual-or-single',   

      silent: true,
      detailed_output: true,
      disable_error_log: true,
      end_session_on_fail: false,
      skip_testcases_on_fail : false,
      log_screenshot_data: false,
      use_xpath: true,

      screenshots: {
        enabled: true,
        on_failure: true,
        on_error:true,
        path: './reports/screenshots',
      },

      desiredCapabilities : {
        browserName : 'chrome',
      },
      webdriver: {
        start_process: true,
        port: 9515,
        server_path: (Services.chromedriver ? Services.chromedriver.path : ''),
        cli_args: [
          // --verbose
        ]
      }
    },

    debug:{
      silent: true,
    },

    firefox: {
      desiredCapabilities : {
        browserName : 'firefox',
        alwaysMatch: {
          'moz:firefoxOptions': {
            args: [
               '-headless',
            ],
          }
        }
      },
      webdriver: {
        start_process: true,
        port: 4443,
        server_path: (Services.geckodriver ? Services.geckodriver.path : ''),
        cli_args: [
        ]
      }
    },
  }
};

function loadServices() {
  try {
    Services.seleniumServer = require('selenium-server');
  } catch (err) {}

  try {
    Services.chromedriver = require('chromedriver');
  } catch (err) {}

  try {
    Services.geckodriver = require('geckodriver');
  } catch (err) {}
}
