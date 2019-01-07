/**
 * a11y testing of search screen.
 */

const pa11y = require('pa11y');
const cli = require('pa11y-reporter-cli');

// Check if a URL was passed, default to localhost if not
let url = 'http://localhost:8080';
const args = process.argv.slice(2); // remove the node.exe and script name
if(args.length){
    url = args[0];
}

// Run the a11y tests
pa11y(url, {
    standard: 'WCAG2AA',
    actions: [
        'set field #search to passport',
        'click element #search-button',
        'screen capture test/results/services-search.pa11y.png'
    ]
}).then((results) => {
    if('issues' in results){ 
        console.log(cli.results(results));
        process.exit(1); // exit with error code
    }    
});