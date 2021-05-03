import React from "react"
import { useHistory, useLocation } from "react-router-dom"

import { useDispatch } from "react-redux"
import { login } from "../../../store/profileSlice"

const Login = () => {
	let history = useHistory()
	const location = useLocation()
	const dispatch = useDispatch()

	const { from }: { from: { pathname: string } } = location.state || ({ from: { pathname: "/" } } as any)

	const onLogin = () => {
		const cb = () => history.replace(from)
		dispatch(login(cb))
	}

	return (
		<div>
			<p>Войдите, чтобы увидеть страницу {from.pathname}</p>
			<button onClick={onLogin}>Log in</button>
		</div>
	)
}

export default Login
