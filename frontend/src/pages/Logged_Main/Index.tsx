import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logout } from "@/store/profileSlice"
import { useTitle } from "@/hooks"
import Button from "@/components-ui/Button"
import Header from "@/components-business/Header/Index"

const Logged_Main = () => {
	useTitle("Главная")

	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	const onLogout = () => {
		dispatch(logout())
	}

	return (
		<div>
			<Header />
			<div style={{ padding: "30px" }}>
				<p>
					{" "}
					<strong>Главная</strong>
				</p>

				<br />

				<div>
					Данные юзера:
					<p>token: {user.token}</p>
				</div>

				<br />

				<p>Ха-ха, здесь ничего нет.</p>

				<br />

				<Button onClick={onLogout}>Выйти</Button>
			</div>
		</div>
	)
}

export default Logged_Main
