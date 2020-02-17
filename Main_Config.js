let AllureReporter = require("jasmine-allure-reporter");
var Jasmine = require('jasmine');
global.deviceName = 'Windows 10';
let now = new Date();
report_name = 'Report-' + now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds();
logfile_name = 'Results-' + now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds();

exports.config = {

    // Selenium Address
    // seleniumServerJar: '../node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59',
     directConnect: true,

    
  //  seleniumAddress :'http://localhost:4444/wd/hub',

    //  Capabilities
       capabilities: {
        browserName: 'chrome',
        

        shardTestFiles: true,
     
        // Maximum number of browser instances that can run in parallel for this
        // set of capabilities. This is only needed if shardTestFiles is true.
        // Default is 1.
        maxInstances: 1,
        
        chromeoptions: {
           args: ['--disable-dev-shm-usage', '--disable-gpu', '--disable-extensions', '--no-sandbox']
         },
         
         download: {
            'prompt_for_download': false,
            'directory_upgrade': true,
            'default_directory':  'Downloads/'
        }
      },
    

    //Jasmine framework is recommended
    framework: 'jasmine',
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,

    //specs

   //  specs: ['../Specs/Walgreens/Spec_Login.js'],
     specs:   ['../Specs/Walgreens/Spec_Store_Home_MenuBar.js'],
   
     
    //options to be passed to Jasmine
    jasmineNodeOpts: {
        defaultTimeoutInterval: 700000
    },

    //Preparation and Reporting

    onPrepare: function () {
        browser.driver.manage().window().maximize();

        browser.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);     //uncomment when start working on non-angular sites.

        var findRemoveSync = require('find-remove');
      //  var result = findRemoveSync('Target/LastBuild/TestResult', {extensions: ['.png', '.xml']});
        jasmine.getEnv().addReporter(new AllureReporter({resultsDir: '../Target/' + global.deviceName + "_" + report_name + '/' + logfile_name}));
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')()
                done();
            });
        });
    },

    onComplete: function (passed) {
        if (passed) {
            console.log('All steps have been passed');
        } else {
            console.log('Atleast one test step has been failed ');
        }

        // var process = require('process');
        var path = require('path');
        var ncp = require('ncp');
        const exec = require('child_process').execSync;
        // var srcPath = path.dirname('../Target/' + global.deviceName + "_" + report_name + '/' + logfile_name + '/.*');
        var srcPath = path.dirname('../Target/' + global.deviceName + "_" + report_name + '/.*');
        var destPath = '../Target/TestResult';
        ncp(srcPath, destPath, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('copying files complete');
        });

        process.chdir('../Target/' + global.deviceName + "_" + report_name)

        exec('allure generate ' + logfile_name, (error, stdout, stderr) => {
            if (error) {
                console.error('exec error :${error}');
                return;
            } else {
                console.log('stdout:${stdout}');
                console.log('stderr:${stderr}');
            }
        });

        exec('allure open', (error, stdout, stderr) => {
            if (error) {
                console.error('exec error :${error}');
                return;
            } else {
                console.log('stdout:${stdout}');
                console.log('stderr:${stderr}');
            }
        });
    }
};
