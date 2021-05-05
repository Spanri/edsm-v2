import React from "react"
import "./Default.scss"

const DefaultLayout = (props: { children: any }) => {
	return <div className="default">{props.children}</div>
}

export default DefaultLayout
