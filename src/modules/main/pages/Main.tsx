import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logout } from "@/store/profileSlice"

const Main = () => {
	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	useEffect(() => {
		document.title = "Главная"
	}, [])

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
