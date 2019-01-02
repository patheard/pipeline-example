/** A simple HTTP server */

const server = require('server');
const { get, post, put, del } = server.router;
const { render } = server.reply;

// Render the homepage for `/`
const home = get('/', ctx => render('index.html'));

// Launch the server
server(home);