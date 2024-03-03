import React from "react"
import "./styles.scss"
import { useHistory } from "react-router-dom"

const TheProfileMenu = (props: any) => {
	const history = useHistory()

	const onGoToMainPage = () => {
		history.push("/main")
	}

	return <div className="profile-menu">Профиль-меню</div>
}

export default TheProfileMenu
