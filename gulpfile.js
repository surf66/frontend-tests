var gulp        = require('gulp'),
    selenium    = require('selenium-standalone'),
    runSequence = require('run-sequence'),
    jasmine     = require('gulp-jasmine'),
    reporters   = require('jasmine-reporters');

gulp.task('regression-test', function() {
    runSequence('selenium-start', 'run-tests', 'selenium-stop');
});

gulp.task('selenium-start', function (done) {
    selenium.install({
        version: '2.45.0',
        baseURL: 'http://selenium-release.storage.googleapis.com',
        drivers: {
            chrome: {
                version: '2.16',
                arch: process.arch,
                baseURL: 'http://chromedriver.storage.googleapis.com'
            }
        },
        logger: function (message) { }
    }, function (err) {
        if (err) return done(err);

        selenium.start(function (err, child) {
            if (err) return done(err);
            selenium.child = child;
            done();
        });
    });
});

gulp.task('run-tests', function() {

    return gulp.src('test/*-spec.js')
        .pipe(jasmine(
            {
                verbose : true,
                includeStackTrace : true,
                reporter: [
                    new reporters.TerminalReporter({
                        verbosity: 3,
                        color: true,
                        showStack: true
                    }),
                    new reporters.JUnitXmlReporter({savePath: 'test-results'})
                ]
            }
        )).on("error", function(result) {
                selenium.child.kill();
                throw new Error("There are failed tests!");
                this.emit('exit');
                process.exit(-1);
                this.emit('end');
        });
});

gulp.task('selenium-stop', function (done) {
    selenium.child.kill();
});
