import React from "react"
import Header from "@/components-business/Header/Index"

const LoggedDefaultLayout = (props: { children: (params: any) => any }) => {
	return (
		<div className="logged-default">
			<Header />

			<div className="logged-default__children-wrapper">
				<div className="logged-default__children">{props.children({})}</div>
			</div>
		</div>
	)
}

export default LoggedDefaultLayout
