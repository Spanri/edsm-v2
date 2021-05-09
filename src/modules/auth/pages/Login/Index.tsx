import React, { useState } from "react"
import "./styles.scss"
import { useHistory, useLocation } from "react-router-dom"

import { useDispatch } from "react-redux"
import { login } from "@/store/profileSlice"

import { useAlert, useTitle } from "@/hooks"
import { vEmail, vRequired, vApi } from "@/helpers/validate.helper"

import Input from "@/ui-components/Input/index"
import Button from "@/ui-components/Button/index"
import Link from "@/ui-components/Link/index"

const Login = () => {
	useTitle("Вход")

	const history = useHistory()
	const location = useLocation()
	const dispatch = useDispatch()
	const { addError, clearErrors } = useAlert()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isShowPassword, setIsShowPassword] = useState(false)
	const [apiErrors, setApiErrors]: [any, any] = useState({})

	const { from }: { from: { pathname: string } } = location.state || ({ from: { pathname: "/" } } as any)

	const validate = {
		email: [vRequired(), vEmail(), vApi(apiErrors["email"])],
		password: [vRequired(), vApi(apiErrors["password"])]
	}

	const onLogin = async () => {
		try {
			await dispatch(login({ email, password }))

			history.replace(from)
			clearErrors()
		} catch ({ message, fields }) {
			setApiErrors(fields)
			addError(message)
		}
	}

	return (
		<form className="login">
			<h2 className="login__title">Войти в систему</h2>

			<Input
				className="login__input"
				value={email}
				onChange={setEmail}
				validate={validate["email"]}
				type="email"
				placeholder="example@example.com"
				width="100%"
				label="EMAIL"
			/>
			<Input
				className="login__input"
				value={password}
				onChange={setPassword}
				validate={validate["password"]}
				type={isShowPassword ? "text" : "password"}
				placeholder="123456#a"
				width="100%"
				label={
					<div className="login__password">
						<span className="login__password-title">ПАРОЛЬ</span>
						<Link className="login__password-remember-button" to={{ pathname: "/password-reset" }}>
							Забыли пароль?
						</Link>
					</div>
				}
				right={
					<i
						className={["login__password-show", isShowPassword ? "icon-eye-close" : "icon-eye-open"].join(" ")}
						onClick={e => setIsShowPassword(!isShowPassword)}
					/>
				}
			/>

			<Button className="login__submit" width="100%" onClick={onLogin}>
				ВОЙТИ
			</Button>

			<div className="login__registration-button link">Хочу зарегистрироваться</div>
		</form>
	)
}

export default Login
