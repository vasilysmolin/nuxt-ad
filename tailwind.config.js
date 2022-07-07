module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'./src/**/*.{html,js}',
		'./node_modules/tw-elements/dist/js/**/*.js'
	],
	theme: {
		fontFamily: {
			'sans': ['Roboto', 'sans-serif']
		},
		container: {
			center: true,
		},
		extend: {
		},
	},
	plugins: [
		require('tw-elements/dist/plugin'),
	],
};
