const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy route with slug
app.use('/proxy/:slug', (req, res, next) => {
    console.log(req)
    next();
});

// Proxy middleware
app.use('/proxy', createProxyMiddleware({
    target: 'https://github.com/falah-club/Mosques-in-the-United-Kingdom/raw/main/', // Target server
    changeOrigin: false,           // Adjust the `Host` header to match the target
}));

// Proxy route with slug
app.use('/rss/:slug', (req, res, next) => {
    console.log(req)
    next();
});
//example test/feed.xml
// feed middleware
app.use('/rss', createProxyMiddleware({
    target: 'https://github.com/falah-club/Feeds/raw/main/', // Target server
    changeOrigin: true,           // Adjust the `Host` header to match the target
}));



// Start the server
app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});