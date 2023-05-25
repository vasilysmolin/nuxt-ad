const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  // TODO Небезопасная настройка, которая убирает проверку
  //  tls для самоподписанных SSL сертификатов, дает возможность axios сделать запрос
  // https://www.ibm.com/docs/en/netcoolomnibus/8?topic=red-using-httphttps-basic-authentication-ssl-protection
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export default {

  // Global page headers: https://go.nuxtjs.dev/config-heads
  ssr: true,
  head: {
    title: 'Объявления',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'format-detection', content: 'telephone=no'},
      {
        hid: 'og:image',
        property: 'og:image',
        content: '',
      },
      {name: 'yandex-verification', content: '8f51fb4bdcc3c896'},
    ],
    link: [
      {rel: 'icon', type: 'image/png', href: '/favicon-32x32.png'},
      {rel: 'apple-touch-icon', type: 'image/png', href: '/apple-touch-icon-180x180.png'},
    ],
  },
  env: {
      HOME_URL: `http://${process.env.DOMAIN_HOME}:${process.env.NUXT_PORT}`,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',

  ],
  server: {
    host: process.env.NUXT_HOST || '0.0.0.0',
    port: process.env.NUXT_PORT || 3000, // default: localhost
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vuelidate'},
    {src: '~/plugins/mask.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/router', {
      keepDefaultRouter: true, // this line is mandatory...
    },
    ],
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
    '@nuxtjs/device',
  ],
  device: {
    refreshOnResize: true,
  },

  basic: {
    name: process.env.BASIC_NAME,
    pass: process.env.BASIC_PASSWORD,
    enabled: process.env.BASIC_ENABLED === 'true', // require boolean value(nullable)
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [

    [
      '@nuxtjs/axios',
      {
        // credentials: true,
        // proxy: true,
        baseURL: `${process.env.API_DOMAIN}/api/`,
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
            domain: `.${process.env.DOMAIN_HOME}`,
          },
        },

        strategies: {
          laravelJWT: {
            scheme: 'refresh',
            provider: 'laravel/jwt',
            url: process.env.API_DOMAIN,
            endpoints: {
              login: {url: '/api/auth/login', method: 'post'},
              refresh: {url: '/api/auth/refresh', method: 'post'},
              user: {
                url: '/api/auth/user',
                method: 'get',
              },
              logout: {url: '/api/auth/logout', method: 'post'},
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
    ['nuxt-tailvue',
      {
        all: true,
        toast: {
          defaultProps: {
            timeout: 10,
            progress: true,
            classToast: ''
          }
        }
      }
    ],
    'nuxt-basic-auth-module',
    'cookie-universal-nuxt',
    '@nuxtjs/proxy',
    'vue2-editor/nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js'
      },
      {
        code: 'ru',
        file: 'ru.js'
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'ru'
  },

  // proxy: {
  //     ...(isDev && {
  //         '/auth': {
  //             target: 'https://' + process.env.PROXY_AUTH,
  //             // auth: 'ktotam:eto_tapigo',
  //             secure: false,
  //             changeOrigin: false,
  //             ws: false,
  //         },
  //         '/_nuxt': {
  //             target: 'https://' +  process.env.PROXY_AUTH,
  //             // auth: 'ktotam:eto_tapigo',
  //             secure: false,
  //             changeOrigin: false,
  //             ws: false,
  //         },
  //     }),
  // },
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
    },
    extend(config, {isClient, isDev}) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = isDev ? 'source-map' : false;
      }
    },
  },
};
