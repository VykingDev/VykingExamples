module.exports = {
	globDirectory: '.',
	globPatterns: [
		'examples/*.html',
		'assets/config/*.bin'
	],
	maximumFileSizeToCacheInBytes: 6291456,
	swDest: '../dist/with-service-worker/service-worker.js',
	"swSrc": "src/service-worker.js"
};