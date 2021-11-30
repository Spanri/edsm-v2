import React from "react"
import ReactDOM from "react-dom"
import { STATE_NAME } from "@/helpers/lsState.helper"
import "./index.scss"
import * as serviceWorker from './serviceWorker';

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
		<div id="app-root">
			<App />
		</div>

		<div id="modal-root" />
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
