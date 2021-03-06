const path = require("path")

// const { alias, configPaths } = require("react-app-rewire-alias")
// const aliasMap = configPaths("./tsconfig.paths.json")

/**
 * Webpack, but overrided
 * @param {Object} config
 */
module.exports = function override(config) {
	const modifiedConfig = config // alias(aliasMap)(config)

	if (!modifiedConfig.module.rules) modifiedConfig.module.rules = []
	modifiedConfig.module.rules.push({
		test: /\.scss$/,
		use: [
			{
				loader: "sass-resources-loader",
				options: {
					resources: [path.resolve(__dirname, "./src/assets/styles/indexForEveryComponent.scss")]
				}
			}
		]
	})

	if (!modifiedConfig.resolve.alias) modifiedConfig.resolve.alias = {}
	modifiedConfig.resolve.alias = {
		...config.resolve.alias,
		react: path.join(__dirname, "node_modules", "react"),
		"@node_modules": path.join(__dirname, "node_modules"),
		"@": path.resolve(__dirname, "src", "")
	}

	return modifiedConfig
}
