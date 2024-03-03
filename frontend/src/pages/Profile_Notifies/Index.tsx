import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logout } from "@/store/profileSlice"
import { useTitle } from "@/hooks"

const Profile_Notifies = () => {
	useTitle("Профиль, уведомления")

	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	const onLogout = () => {
		dispatch(logout())
	}

	return <div>Профиль, уведомления</div>
}

export default Profile_Notifies
