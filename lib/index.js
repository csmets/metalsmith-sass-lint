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
const path = require('path');

const sasslint = opts =>
    (files, metalsmith, done) => {
        setImmediate(done);

        const stylelintOpts = opts || {};

        if (stylelintOpts.configFile !== undefined) {
            stylelintOpts.configFile =
                `${metalsmith._directory}/${opts.configFile}`;
        }

        Object.keys(files).forEach((file) => {
            if (
                path.extname(file) === '.scss' || path.extname(file) === '.sass'
            ) {
                const fileContents = files[file].contents.toString('utf8');

                postcss([
                    stylelint(stylelintOpts),
                    reporter({ clearMessages: true }),
                ])
                    .process(fileContents, {
                        from: file,
                        syntax: scss,
                    })
                    .then()
                    .catch(err => console.error(err.stack));
            }
        });
    };

module.exports = sasslint;
