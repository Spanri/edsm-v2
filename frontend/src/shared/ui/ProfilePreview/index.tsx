import React from "react"
import "./styles.scss"

const ProfilePreview = (props: any) => {
	return <div className={"profile-preview " + props.className} onClick={() => props.onClick()}></div>
}

export default ProfilePreview
