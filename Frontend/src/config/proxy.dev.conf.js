const PROXY_CONFIG = {
    '/api': {
        target: 'https://5c1a-2804-1b3-a9c0-2e86-b365-3cf3-ffb4-963b.ngrok-free.app/',
        secure: false,
        pathRewrite: {
            '^/api/': ''
        },
        changeOrigin: true,
        onProxyRes(proxyRes)
        {
            let newCookies;

            if (newCookies = proxyRes.headers['set-cookie'])
            {
                newCookies[0] = newCookies[0]
                    .replace(/HttpOnly;/gi, '')
                    .replace(/Secure/gi, '')
                ;
            }
        }
    }
};

module.exports = PROXY_CONFIG;