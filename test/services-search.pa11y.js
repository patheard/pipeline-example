/**
 * Proof of concept using pa11y actions.
 * TODO: figure out why JS actions aren't executed by actions.
 */

const pa11y = require('pa11y');

pa11y('http://localhost:8080/', {
    standard: 'WCAG2AA',
    actions: [
        'set field #search to passport',
        'screen capture test/results/services-search.pa11y.png'
    ]
}).then((results) => {
    console.log(results);
});