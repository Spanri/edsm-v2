import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"

import DefaultRoute from "../../../ui-components/DefaultRoute"
import AuthDefaultLayout from "../layouts/Default"
import Login from "./Login"
import PasswordReset from "./PasswordReset"

const AuthIndex = () => {
	return (
		<Switch>
			<DefaultRoute path="/login">
				<AuthDefaultLayout>
					<Login />
				</AuthDefaultLayout>
			</DefaultRoute>

			<DefaultRoute path="/password-reset">
				<AuthDefaultLayout>
					<PasswordReset />
				</AuthDefaultLayout>
			</DefaultRoute>

			<Route path="*">
				<Redirect to="/login" />
			</Route>
		</Switch>
	)
}

export default AuthIndex
