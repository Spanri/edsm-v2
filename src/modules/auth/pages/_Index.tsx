import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"

import DefaultRoute from "@/ui-components/DefaultRoute"
import AuthDefaultLayout from "../layouts/Default"
import Login from "./Login/Index"
import PasswordReset from "./PasswordReset/Index"

const AuthIndex = () => {
	return (
		<Switch>
			<DefaultRoute path="/login">
				<AuthDefaultLayout>{params => <Login {...params} />}</AuthDefaultLayout>
			</DefaultRoute>

			<DefaultRoute path="/password-reset">
				<AuthDefaultLayout>{params => <PasswordReset {...params} />}</AuthDefaultLayout>
			</DefaultRoute>

			<Route path="*">
				<Redirect to="/login" />
			</Route>
		</Switch>
	)
}

export default AuthIndex
