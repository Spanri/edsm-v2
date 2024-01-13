export function register(config) {
	if ("serviceWorker" in navigator) {
		const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`

		navigator.serviceWorker
			.register(swUrl, { scope: "./" })
			.then(function (registration) {
				console.log("Service Worker Registered")
			})
			.catch(function (err) {
				console.log("Service Worker Failed to Register", err)
			})
	}
}
