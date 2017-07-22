# Metalsmith Sass Lint

Make sure your metalsmith project sass files are following your teams
styleguide :)

Created due to no stylelint checking plugin found for metalsmith, and we needed
something this for our production uses.

# Installation
```
npm install metalsmith-sass-lint --save-dev
```

# Usage
```javascript
const Metalsmith = require('metalsmith');
const sasslint = require('metalsmit-sass-lint');

new Metalsmith()
    .source('styles')
    .use(sasslint({
        configFile: '.stylelintrc',
    }))
    .build();
```
