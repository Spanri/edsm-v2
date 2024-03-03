import React from "react"
import Header from "@/shared/TheHeader"

const LoggedDefaultLayout = (props: { children: (params: any) => any }) => {
	return (
		<div className="logged-default-layout">
			<Header />

			<div className="logged-default-layout__children-wrapper">
				<div className="logged-default-layout__children">{props.children({})}</div>
			</div>
		</div>
	)
}

export default LoggedDefaultLayout
