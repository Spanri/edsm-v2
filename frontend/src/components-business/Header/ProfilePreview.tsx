import React from "react"

const ProfilePreview = (props: any) => {
	return <div className={"profile-preview " + props.className} onClick={() => props.onClick()}></div>
}

export default ProfilePreview
