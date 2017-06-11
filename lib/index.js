/*
 * Metalsmith Sass Linter
 * ======================
 *
 * This plugin uses stylelint and postcss npm modules to check if your sass
 * files are following your styleguide.
 *
 * Useful for production project or for the fussy developer
 *
 */

const stylelint = require('stylelint');
const postcss = require('postcss');
const scss = require('postcss-scss');
const reporter = require('postcss-reporter');

const sasslint = opts =>
    (file, metalsmith, done) => {
        setImmediate(done);

        const filePath = Object.keys(file)[0];

        const fileContents = file[filePath].contents.toString('utf8');

        const stylelintOpts = opts || {};

        stylelintOpts.configFile =
            `${process.cwd()}/${metalsmith._directory}${opts.configFile}`;

        postcss([
            stylelint(opts),
            reporter({ clearMessages: true }),
        ])
            .process(fileContents, {
                from: filePath,
                syntax: scss,
            })
            .then()
            .catch(err => console.error(err.stack));
    };

module.exports = sasslint;
