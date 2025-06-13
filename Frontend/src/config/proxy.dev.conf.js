const PROXY_CONFIG = {
    '/api': {
        target: 'https://09d7-2804-1b3-a9c0-2e86-d480-128b-6fd2-53.ngrok-free.app/',
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