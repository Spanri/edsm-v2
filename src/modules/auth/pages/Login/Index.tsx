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
import Modal from "@/ui-components/Modal"

const Login = () => {
	useTitle("Вход")

	const history = useHistory()
	const location = useLocation()
	const dispatch = useDispatch()
	const { addError, clearErrors } = useAlert()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isShowPassword, setIsShowPassword] = useState(false)
	const [isRegModalOpen, setIsRegModalOpen] = useState(false)
	const [apiErrors, setApiErrors]: [any, any] = useState({})

	const { from }: { from: { pathname: string } } = location.state || ({ from: { pathname: "/" } } as any)

	const contacts = [
		{
			id: "email",
			label: "Почта",
			value: "kozlova9v@mail.ru"
		},
		{
			id: "telegram",
			label: "Telegram",
			value: "spanri"
		},
		{
			id: "vk",
			label: "VK",
			value: "https://vk.com/animeshny_kot"
		}
	]

	const validate = {
		email: [vRequired(), vEmail(), vApi(apiErrors["email"])],
		password: [vRequired(), vApi(apiErrors["password"])]
	}

	const onLogin = async (event: any) => {
		event.preventDefault()

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
		<form className="login" onSubmit={onLogin}>
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

			<Button className="login__submit" type="submit" width="100%">
				ВОЙТИ
			</Button>

			<div className="login__registration-button link" onClick={() => setIsRegModalOpen(true)}>
				Хочу зарегистрироваться
			</div>

			<Modal
				isOpen={isRegModalOpen}
				modalTitle="reg-modal"
				title={"Памятка по регистрации"}
				style={{ maxWidth: "500px", height: "max-content" }}
				onClose={() => setIsRegModalOpen(false)}
			>
				<div>Новые аккаунты регистрирует администратор. Если вы хотите получить доступ к системе, обратитесь к администратору:</div>
				<br />

				<div className="reg-modal__contacts-wrapper">
					<div className="reg-modal__contacts">
						{contacts.map(contact => (
							<div key={"reg-modal-" + contact.id} className="reg-modal__contacts-item">
								<label className="reg-modal__contacts-label">{contact.label}:</label>
								<strong className="reg-modal__contacts-value">{contact.value}</strong>
							</div>
						))}
					</div>

					<div className="reg-modal__call-icon">🤙</div>
				</div>
			</Modal>
		</form>
	)
}

export default Login
