import React, { useState } from "react"
import "./styles.scss"
import { useResizeDetector } from "react-resize-detector"

import { useDispatch } from "react-redux"
import { resetPassword } from "@/store/profileSlice"
import { useAlert, useTitle } from "@/hooks"

import Input from "@/shared/ui/Input/index"
import Button from "@/shared/ui/Button/index"
import Link from "@/shared/ui/Link/index"

const Auth_PasswordReset = (props: { parentWidth: number; parentHeight: number }) => {
	useTitle("Восстановление пароля")

	const dispatch = useDispatch()
	const { addError, clearErrors } = useAlert()
	const { width: contentWidth, height: contentHeight, ref: contentRef } = useResizeDetector()

	const [email, setEmail] = useState("")
	const [isEmailSent, setIsEmailSent] = useState(false)

	const EXTRA_SPACE = 40

	const infoWidth = (() => {
		const normalizedContentWidth = contentWidth || 0
		const paddingWidth = (props.parentWidth - normalizedContentWidth) / 2

		return normalizedContentWidth + paddingWidth + EXTRA_SPACE
	})()

	const onSubmit = async () => {
		try {
			await dispatch(resetPassword({ email }))

			clearErrors()
			setIsEmailSent(true)
		} catch ({ message }) {
			addError(message)
		}
	}

	return (
		<div ref={contentRef} className="password-reset">
			<h2 className="password-reset__title">Восстановление пароля</h2>

			{!isEmailSent ? (
				<React.Fragment>
					<div className="password-reset__info">
						{/* style={{ width: infoWidth + "px" }} */}
						Введите почту, которая была указана при регистрации. На эту почту придет письмо с дальнейшими указаниями.
					</div>

					<Input
						className="password-reset__input"
						value={email}
						onChange={setEmail}
						type="email"
						placeholder="example@example.com"
						width="100%"
						label="EMAIL"
					/>

					<Button className="password-reset__submit" width="100%" onClick={onSubmit}>
						ОТПРАВИТЬ ПИСЬМО
					</Button>
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="password-reset__info" style={{ width: infoWidth + "px" }}>
						Письмо отправлено!
					</div>
				</React.Fragment>
			)}

			<Link className="password-reset__login-button" to={{ pathname: "/login" }}>
				На страницу входа
			</Link>
		</div>
	)
}

export default Auth_PasswordReset
