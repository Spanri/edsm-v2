import React, { useEffect } from "react"

/**
 * !!!
 * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 */

const useClickOutside = (props: { ref: any; onClick?: (event: any) => void }) => {
	useEffect(() => {
		// Alert if clicked on outside of element
		const handleClickOutside = (event: any) => {
			if (props.ref.current && !props.ref.current.contains(event.target)) {
				if (props.onClick) {
					props.onClick(event)
				}
			}
		}

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside)

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [props.ref])
}

export default useClickOutside
