import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logout } from "@/store/profileSlice"
import { useTitle } from "@/hooks"
import Button from "@/components-ui/Button"
import Header from "@/components-business/Header/Index"

const Logged_Main = () => {
	useTitle("Профиль, главная")

	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	const onLogout = () => {
		dispatch(logout())
	}

	return <div>Профиль</div>
}

export default Logged_Main
