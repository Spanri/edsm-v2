import React from "react"
import "./styles.scss"

const GlobalSearch = (props: any) => {
	return <input className={"global-search " + props.className} placeholder="Глобальный поиск" />
}

export default GlobalSearch
