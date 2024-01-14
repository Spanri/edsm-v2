import React from "react"
import "./Default.scss"

const DefaultLayout = (props: { children: any }) => {
	return <div className="default-layout">{props.children}</div>
}

export default DefaultLayout
