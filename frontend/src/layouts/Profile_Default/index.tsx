import React from "react"
import "./styles.scss"
import TheProfileMenu from "@/shared/TheProfileMenu"

const ProfileDefaultLayout = (props: { children: (params: any) => any }) => {
	return (
		<div className="profile-default-layout">
			<TheProfileMenu />

			<div className="profile-default-layout__children-wrapper">
				<div className="profile-default-layout__children">{props.children({})}</div>
			</div>
		</div>
	)
}

export default ProfileDefaultLayout
