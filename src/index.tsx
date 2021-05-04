import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import { STATE_NAME } from "./helpers/lsState.helper"

import App from "./App"

// reload other tabs, if this is login/logout
window.addEventListener("storage", event => {
	const isReduxState = event.key == STATE_NAME
	if (isReduxState) {
		const newValue = JSON.parse(event.newValue || "")
		const oldValue = JSON.parse(event.oldValue || "")
		const newIsAuthenticated = newValue && newValue.profile && newValue.profile.isAuthenticated
		const oldIsAuthenticated = oldValue && oldValue.profile && oldValue.profile.isAuthenticated

		if (newIsAuthenticated != oldIsAuthenticated) {
			window.location.reload()
		}
	}
})

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
