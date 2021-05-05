import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import PropTypes from "prop-types"

interface propsType {
	children: any
	routes: any
	path: string
}

const DefaultRoute = (props: propsType) => {
	return (
		<Switch>
			<Route exact path={props.path}>
				{props.children}
			</Route>

			{props.routes}

			<Route exact path={props.path + "/*"}>
				<Redirect to={props.path} />
			</Route>
		</Switch>
	)
}

DefaultRoute.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	routes: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	path: PropTypes.string
}

export default DefaultRoute
