import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import "./styles.scss"

import { useClickOutside } from "@/hooks"

import CloseButton from "@/components-ui/CloseButton/index"

interface portalPropsType {
	children: any
	modalTitle?: string
}

interface propsType extends portalPropsType {
	isOpen: boolean
	title: any
	style?: any
	className?: string
	onClose?: (event: any) => void
}

const ModalPortal = (props: portalPropsType) => {
	const modalRoot = document.getElementById("modal-root")
	const el = document.createElement("div")

	if (props.modalTitle) {
		el.classList.add("ui-modal-wrapper")
		el.classList.add(props.modalTitle)
	}

	useEffect(() => {
		if (modalRoot) {
			modalRoot.appendChild(el)
		}

		return () => {
			if (modalRoot) {
				modalRoot.removeChild(el)
			}
		}
	}, [el])

	return ReactDOM.createPortal(props.children, el)
}

const Modal = (props: propsType) => {
	const ref = useRef(null)
	useClickOutside({ ref, onClick: props.onClose })

	useEffect(() => {
		const handleEsc = (event: any) => {
			if (event.keyCode === 27) {
				if (props.onClose) {
					props.onClose(event)
				}
			}
		}
		window.addEventListener("keydown", handleEsc)

		return () => {
			window.removeEventListener("keydown", handleEsc)
		}
	}, [])

	return (
		<ModalPortal modalTitle={props.modalTitle}>
			<React.Fragment>
				{props.isOpen && (
					<div ref={ref} className={`ui-modal ${props.className}`}>
						<div className="ui-modal-inner" style={props.style}>
							<div className="ui-modal__header">
								{props.title && <div className="ui-modal__title">{props.title}</div>}

								<CloseButton className="ui-modal__close" onClick={props.onClose} />
							</div>

							<div className="ui-modal__content">{props.children}</div>
						</div>
					</div>
				)}
			</React.Fragment>
		</ModalPortal>
	)
}

Modal.defaultProps = {
	modalTitle: "modal-item",
	className: "",
	style: {}
}

Modal.propTypes = {
	isOpen: PropTypes.bool,
	title: PropTypes.node,
	children: PropTypes.node.isRequired,
	modalTitle: PropTypes.string,
	className: PropTypes.string,
	onClose: PropTypes.func
}

export default Modal
