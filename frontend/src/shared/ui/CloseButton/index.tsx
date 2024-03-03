import React from "react"
import PropTypes from "prop-types"
import "./styles.scss"

import Boop from "@/shared/ui/Boop"

interface propsType {
	className?: string
	onClick?: (event: any) => void
}

const CloseButton = (props: propsType) => {
	return (
		<div className={`ui-close-button ${props.className}`}>
			<Boop>
				<i className="ui-alert__close-icon icon-close" onClick={props.onClick} />
			</Boop>
		</div>
	)
}

CloseButton.defaultTypes = {
	className: ""
}

CloseButton.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func
}

export default CloseButton
