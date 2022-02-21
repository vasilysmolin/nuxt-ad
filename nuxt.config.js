const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
    // TODO Небезопасная настройка, которая убирает проверку
    //  tls для самоподписанных SSL сертификатов, дает возможность axios сделать запрос
    // https://www.ibm.com/docs/en/netcoolomnibus/8?topic=red-using-httphttps-basic-authentication-ssl-protection
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export default {

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Профиль пользователя Тапиго',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Главная'},
            {name: 'format-detection', content: 'telephone=no'},
            {
                hid: 'og:image',
                property: 'og:image',
                content: 'https://y.yarn.co/451fe9c2-9ac8-415a-8499-f24e157f128a_thumb.jpg'
            }
        ],
        link: [
            {rel: 'icon', type: 'image/png', href: '/favicon-32x32.png'},
            {rel: 'apple-touch-icon', type: 'image/png', href: '/apple-touch-icon-180x180.png'},
            {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
            {rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap'}
        ],
        script: [
            {hid: 'stripe', src: '@/node_modules/tw-elements/dist/js/index.min.js', defer: true}
        ]
    },
    env: {
        AUTH_URL: process.env.HOME_URL + '/auth/sign-in',
        HOME_URL: process.env.HOME_URL,
        HUB_URL: process.env.HUB_URL + '/profile',
        JOBS_URL: process.env.JOBS_URL,
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/main.css',
    ],
    server: {
        // https: {
        //     key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
        //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
        //     passphrase: '1234',
        // },
        host: process.env.NUXT_HOST || '0.0.0.0',
        port: process.env.NUXT_PORT || 3000, // default: localhost
    },

    googleFonts: {
        families: {
            Roboto: true,
        },
        display: 'swap',
        subsets: 'cyrillic',
        preconnect: true,
        preload: true,
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],
    // router: {
    //     middleware: ['auth']
    // },

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        [ "k-domains", {
            subDomains: ['jobs','hub'], // List of directories to hold te pages for your subdomains
            rootDomain: "root-domain" //  directory to hold the pages for root domain
        }
        ],
        ["@nuxtjs/router",{
            keepDefaultRouter: true // this line is mandatory...
        }
        ],
        '@nuxtjs/tailwindcss',
        '@nuxt/postcss8',
        '@nuxtjs/google-fonts'
    ],

    basic: {
        name: process.env.BASIC_NAME,
        pass: process.env.BASIC_PASSWORD,
        enabled: process.env.BASIC_ENABLED === 'true' // require boolean value(nullable)
    },


    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        [
            '@nuxtjs/axios',
            {
                // credentials: true,
                // proxy: true,
                baseURL: process.env.API_DOMAIN + '/api/',
            },
        ],
        [
            '@nuxtjs/auth-next',
            {
                redirect: {
                    home: false,
                },
                watchLoggedIn: false,
                rewriteRedirects: false,
                token: {
                    prefix: '_token.',
                    global: true,
                },

                cookie: {
                    options: {
                        domain: '.' + process.env.HOME,
                    },
                },

                strategies: {
                    laravelJWT: {
                        scheme: 'refresh',
                        provider: 'laravel/jwt',
                        url: process.env.API_DOMAIN,
                        endpoints: {
                            login: { url: '/api/auth/login', method: 'post' },
                            refresh: { url: '/api/auth/refresh', method: 'post' },
                            user: {
                                url: '/api/auth/user',
                                method: 'get',
                            },
                            logout: { url: '/api/auth/logout', method: 'post' },
                        },
                        token: {
                            property: 'access_token',
                            maxAge: 60 * 60 * 24 * 90,
                            global: true,
                        },
                        refreshToken: {
                            maxAge: 60 * 60 * 24 * 120,
                            property: 'refresh_token',
                            data: 'refresh_token',
                        },
                    },
                },
            },
        ],
        'nuxt-basic-auth-module',
        'cookie-universal-nuxt',
        '@nuxtjs/proxy',
    ],

    proxy: {
        ...(isDev && {
            '/auth': {
                target: 'https://' + process.env.PROXY_AUTH,
                // auth: 'ktotam:eto_tapigo',
                secure: false,
                changeOrigin: false,
                ws: false,
            },
            '/_nuxt': {
                target: 'https://' +  process.env.PROXY_AUTH,
                // auth: 'ktotam:eto_tapigo',
                secure: false,
                changeOrigin: false,
                ws: false,
            },
        }),
    },
    // axios: {
    //     proxy: true
    // },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        }
    }
}
