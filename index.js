// Import the library
const server = require('server');
const { get, post, put, del } = server.router;
const { render } = server.reply;

// Render the homepage for `/`
const home = get('/', ctx => render('src/views/index.html'));