/** A simple HTTP server */
const server = require('server');
const { get } = server.router;
const { render } = server.reply;
const services = require('./src/controllers/services');

// Server options
const options = {
    port: 8080,
    public: 'src/assets',   // static assets
    views: 'src/views'      // views used to render the response
};

// Launch the server
server(
    options,
    [        
        get('/', ctx => render('index.html')),      // homepage
        get('/services/search', services.search)    // search
    ]
);