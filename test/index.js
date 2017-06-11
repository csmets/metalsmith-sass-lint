//const test = require('ava');
const Metalsmith = require('metalsmith');
const sasslint = require('../');

test('Testing if metalsmith-bazooka loads', (t) => {
    const testPath = 'test/fixtures/';

    new Metalsmith(testPath)
        .source('styles')
        .use(sasslint({
            configFile: '.stylelintrc',
        }))
        .build(() => {
            t.pass();
        });
});
