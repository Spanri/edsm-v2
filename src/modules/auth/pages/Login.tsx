import React, { useState } from "react"
import "./styles.scss"
import { useHistory, useLocation } from "react-router-dom"

import { useDispatch } from "react-redux"
import { login } from "../../../store/profileSlice"

import Input from "../../../ui-components/Input/index"
import Button from "../../../ui-components/Button/index"

const Login = () => {
	let history = useHistory()
	const location = useLocation()
	const dispatch = useDispatch()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { from }: { from: { pathname: string } } = location.state || ({ from: { pathname: "/" } } as any)

	const onLogin = () => {
		const cb = () => history.replace(from)
		dispatch(login({ email, password }, cb))
	}

	return (
		// <p>Войдите, чтобы увидеть страницу {from.pathname}</p>
		<div className="login-wrapper">
			<div className="login">
				<div className="login__description">
					<h1 className="login__description-title">Система электронного документооборота “АНИНА”</h1>
					<div className="login__description-slogan slogan">
						<div className="slogan__title">Наш слоган:</div>
						<div className="slogan__description">
							<span>
								Не гарантируем работоспособность,
								<br />
								зато дизайн вон какой!
							</span>
							<span className="slogan__description-icon">👍</span>
						</div>
					</div>
				</div>

				<form className="login__form form">
					<h2 className="form__title">Войти в систему</h2>

					<Input className="form__input" value={email} onChange={setEmail} placeholder="example@example.com" width="100%" label="EMAIL" />
					<Input
						className="form__input"
						value={password}
						onChange={setPassword}
						placeholder="123456#a"
						width="100%"
						label={
							<div className="form__password">
								<span className="form__password-title">ПАРОЛЬ</span>
								<span className="form__password-remember-button link">Забыли пароль?</span>
							</div>
						}
					/>

					<Button className="form__submit" width="100%" height="50px" onClick={onLogin}>
						ВОЙТИ
					</Button>

					<div className="form__registration-button link">Хочу зарегистрироваться</div>
				</form>
			</div>
		</div>
	)
}

export default Login
