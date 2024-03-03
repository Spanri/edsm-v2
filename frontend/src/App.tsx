import React from "react"
import "@/assets/styles/indexApp.scss"
import "./App.scss"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import { Provider, useSelector } from "react-redux"
import store from "@/store/index"
import { selectIsAuthenticated } from "@/store/profileSlice"
import { selectSuccessItems, selectErrorItems } from "@/store/alertSlice"

import DefaultRoute from "@/shared/ui/DefaultRoute"

import AuthDefaultLayout from "@/layouts/Auth_Default"
import LoggedDefaultLayout from "@/layouts/Logged_Default"
import ProfileDefaultLayout from "@/layouts/Profile_Default/index"
import DefaultLayout from "@/layouts/Default"

import AuthLogin from "@/pages/Auth_Login/Index"
import AuthPasswordReset from "@/pages/Auth_PasswordReset/Index"
import LoggedMain from "@/pages/Logged_Main/Index"
import ProfileNotifies from "@/pages/Profile_Notifies/Index"
import SharedFAQ from "@/pages/Shared_FAQ/Index"
import AlertManager from "@/shared/ui/AlertManager"

const App = () => {
	return (
		<Provider store={store}>
			<WithStore />
		</Provider>
	)
}

const WithStore = () => {
	const successItems = useSelector(selectSuccessItems)
	const errorItems = useSelector(selectErrorItems)

	return (
		<React.Fragment>
			<AlertManager className="alert-manager" successItems={successItems} errorItems={errorItems} />

			<BrowserRouter>
				<SharedRouteResolver>
					<ProtectedRouteResolver />
				</SharedRouteResolver>
			</BrowserRouter>
		</React.Fragment>
	)
}

const SharedRouteResolver = (props: any) => {
	return (
		<Switch>
			<DefaultRoute path="/faq">
				<DefaultLayout>
					<SharedFAQ />
				</DefaultLayout>
			</DefaultRoute>

			<Route path="*">{props.children}</Route>
		</Switch>
	)
}

const ProtectedRouteResolver = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	return isAuthenticated ? <MainRouteResolver /> : <AuthRouteResolver />
}

const AuthRouteResolver = () => {
	return (
		<Switch>
			<DefaultRoute path="/login">
				<AuthDefaultLayout>{params => <AuthLogin {...params} />}</AuthDefaultLayout>
			</DefaultRoute>

			<DefaultRoute path="/password-reset">
				<AuthDefaultLayout>{params => <AuthPasswordReset {...params} />}</AuthDefaultLayout>
			</DefaultRoute>

			<Route path="*">
				<Redirect to="/login" />
			</Route>
		</Switch>
	)
}

const MainRouteResolver = () => {
	return (
		<LoggedDefaultLayout>
			{params => (
				<Switch>
					<Route path="/profile">
						<ProfileDefaultLayout>
							{params => (
								<Switch>
									<Route path="/">
										<ProfileNotifies />
									</Route>

									<Route path="/notifies">
										<ProfileNotifies />
									</Route>
								</Switch>
							)}
						</ProfileDefaultLayout>
					</Route>

					<Route path="/">
						<LoggedMain />
					</Route>
				</Switch>
			)}
		</LoggedDefaultLayout>
	)
}

export default App
