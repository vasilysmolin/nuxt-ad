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
    title: 'Тапиго | Бесплатный каталог обьявлений, вакансии и резюме, поиск исполнителя, доставка еды и создание своего ресторана',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      // {hid: 'description', name: 'description', content: 'Главная'},
      {name: 'format-detection', content: 'telephone=no'},
      {
        hid: 'og:image',
        property: 'og:image',
        content: '',
      },
      {name: 'yandex-verification', content: '8f51fb4bdcc3c896'},
    ],
    script: [
      {
        src: 'js/context-custom.js',
      },
      {
        src: 'https://yandex.ru/ads/system/context.js',
        async: true,
      },
    ],
    link: [
      {rel: 'icon', type: 'image/png', href: '/favicon-32x32.png'},
      {rel: 'apple-touch-icon', type: 'image/png', href: '/apple-touch-icon-180x180.png'},
    ],
  },
  env: {
    ...(isDev && {
      AUTH_URL: `http://${process.env.DOMAIN_HOME}:${process.env.NUXT_PORT}/auth/sign-in`,
      HOME_URL: `http://${process.env.DOMAIN_HOME}:${process.env.NUXT_PORT}`,
      HUB_URL: `http://${process.env.HUB}:${process.env.NUXT_PORT}`,
      JOBS_URL: `http://${process.env.JOBS}:${process.env.NUXT_PORT}`,
      OFFICE_URL: `http://${process.env.OFFICE}:${process.env.NUXT_PORT}`,
      CATALOG_URL: `http://${process.env.CATALOG}:${process.env.NUXT_PORT}`,
      USLUGI_URL: `http://${process.env.USLUGI}:${process.env.NUXT_PORT}`,
      FOOD_URL: `http://${process.env.FOOD}:${process.env.NUXT_PORT}`,
      TRAVEL_URL: `http://${process.env.TRAVEL}:${process.env.NUXT_PORT}`,
      MED_URL: `http://${process.env.MED}:${process.env.NUXT_PORT}`,
      PET_URL: `http://${process.env.PET}:${process.env.NUXT_PORT}`,
      AVIA_URL: `http://${process.env.AVIA}:${process.env.NUXT_PORT}`,
      HOTELS_URL: `http://${process.env.HOTELS}:${process.env.NUXT_PORT}`,
    }),
    ...(!isDev && {
      AUTH_URL: `https://${process.env.DOMAIN_HOME}/auth/sign-in`,
      HOME_URL: `https://${process.env.DOMAIN_HOME}`,
      HUB_URL: `https://${process.env.HUB}`,
      JOBS_URL: `https://${process.env.JOBS}`,
      OFFICE_URL: `https://${process.env.OFFICE}`,
      CATALOG_URL: `https://${process.env.CATALOG}`,
      USLUGI_URL: `https://${process.env.USLUGI}`,
      FOOD_URL: `https://${process.env.FOOD}`,
      TRAVEL_URL: `https://${process.env.TRAVEL}`,
      MED_URL: `https://${process.env.MED}`,
      PET_URL: `https://${process.env.PET}`,
      AVIA_URL: `https://${process.env.AVIA}`,
      HOTELS_URL: `https://${process.env.HOTELS}`,
    }),
    YANDEX_MAP: process.env.YANDEX_MAP,
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

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/directives.js'},
    {src: '~/plugins/vuelidate'},
    {src: '~/plugins/mask.js'},
    {src: '~/plugins/vue-js-modal.js'},
    {src: '~/plugins/vue-datepicker', ssr: false}
  ],
  // router: {
  //     middleware: ['auth']
  // },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['k-domains', {
      subDomains: ['jobs', 'hub', 'office', 'catalog',
        'uslugi', 'food', 'travel', 'med', 'pet', 'avia', 'hotels'
      ], // List of directories to hold te pages for your subdomains
      rootDomain: 'root-domain', //  directory to hold the pages for root domain
    },
    ],
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
    // https://go.nuxtjs.dev/axios
    [
      '@nuxtjs/yandex-metrika',
      {
        id: 54862972,
        webvisor: true,
        clickmap: true,
      },
    ],
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
