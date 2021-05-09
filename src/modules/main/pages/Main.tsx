import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logout } from "@/store/profileSlice"
import { useTitle } from "@/hooks"

const Main = () => {
	useTitle("Главная")

	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	const onLogout = () => {
		dispatch(logout())
	}

	return (
		<div>
			<p>user: {user}</p>
			Главная. Ха-ха, здесь ничего нет.
			<button onClick={onLogout}>Выйти</button>
		</div>
	)
}

export default Main
