import React from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../../../store/profileSlice"

import { useDispatch } from "react-redux"
import { logout } from "../../../store/profileSlice"

const Main = () => {
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
