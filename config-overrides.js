const path = require("path")

/**
 * Webpack, but overrided))
 * @param {Object} config
 */
module.exports = function override(config) {
	if (!config.module.rules) config.module.rules = []
	if (!config.resolve.alias) config.resolve.alias = {}

	config.module.rules.push({
		test: /\.scss$/,
		use: [
			{
				loader: "sass-resources-loader",
				options: {
					resources: [path.resolve(__dirname, "./src/assets/styles/index.scss")]
				}
			}
		]
	})

	config.resolve.alias = {
		...config.resolve.alias,
		react: path.join(__dirname, "node_modules", "react"),
		"@node_modules": path.join(__dirname, "node_modules"),
		"@": path.resolve(__dirname, "src", ""),
		"@store": path.resolve(__dirname, "src", "store"),
		"@assets": path.resolve(__dirname, "src", "assets"),
		"@ui-components": path.resolve(__dirname, "src", "ui-components"),
		"@helpers": path.resolve(__dirname, "src", "helpers"),
		"@modules": path.resolve(__dirname, "src", "modules")
	}

	return config
}
