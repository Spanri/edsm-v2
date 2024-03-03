import React from "react"
import "./styles.scss"
import { useHistory } from "react-router-dom"

import GlobalSearch from "@/shared/GlobalSearch"
import ProfilePreview from "@/shared/ui/ProfilePreview"

const Header = (props: any) => {
	const history = useHistory()

	const onGoToMainPage = () => {
		history.push("/main")
	}

	const onGoToProfilePage = () => {
		history.push("/profile")
	}

	return (
		<div className="header">
			<div className="header__logo" onClick={() => onGoToMainPage()}>
				СЭД &quot;АНЯ&quot;
			</div>

			<div className="header__space" />

			<GlobalSearch className="header__global-search" />
			<ProfilePreview className="header__profile-preview" onClick={onGoToProfilePage} />
		</div>
	)
}

export default Header
