import React from "react"
import PropTypes from "prop-types"
import "./styles.scss"
import useAlert from "../../hooks/alert"

import Alert from "./Alert/index"

interface propsType {
	className?: string
	successItems: alertType[]
	errorItems: alertType[]
}

const AlertManager = (props: propsType) => {
	const { deleteAlert } = useAlert()

	const onDeleteAlert = (alertItem: alertType) => {
		deleteAlert(alertItem.id)
	}

	return (
		<div className={`ui-alert-manager ${props.className}`}>
			{!!props.errorItems.length && (
				<div className="ui-alert-manager__error block">
					<div className="block__title">Ошибка</div>

					{props.errorItems.map((errorItem, errorIndex) => (
						<Alert
							key={`error-item-${errorIndex}`}
							className="block__item"
							theme="error"
							timeout={errorItem.timeout}
							onDelete={() => onDeleteAlert(errorItem)}
						>
							{errorItem.text}
						</Alert>
					))}
				</div>
			)}

			{!!props.successItems.length && (
				<div className="ui-alert-manager__success block">
					<div className="block__title">Успешно</div>

					{props.successItems.map((successItem, successIndex) => (
						<Alert
							key={`success-item-${successIndex}`}
							className="block__item"
							theme="success"
							timeout={successItem.timeout}
							onDelete={() => onDeleteAlert(successItem)}
						>
							{successItem.text}
						</Alert>
					))}
				</div>
			)}
		</div>
	)
}

AlertManager.propTypes = {
	className: PropTypes.string,
	successItems: PropTypes.array,
	errorItems: PropTypes.array
}

export default AlertManager
