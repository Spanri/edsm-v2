import React, { useEffect } from "react"
import PropTypes from "prop-types"
import "./styles.scss"
import { useAlert } from "@/hooks"

import Alert from "./Alert/index"

interface propsType {
	className?: string
	successItems: alertType[]
	errorItems: alertType[]
}

const MAX_COUNT = 5

const AlertManager = (props: propsType) => {
	const { deleteAlert } = useAlert()

	const normalizeAlerts = (items: alertType[]) => {
		items.forEach((item, index) => {
			if (index > MAX_COUNT) {
				deleteAlert(item.id)
			}
		})
	}

	const normalizedErrorItems = [...props.errorItems].reverse()
	useEffect(() => normalizeAlerts(normalizedErrorItems), [normalizedErrorItems])

	const normalizedSuccessItems = [...props.successItems].reverse()
	useEffect(() => normalizeAlerts(normalizedErrorItems), [normalizedErrorItems])

	const onDeleteAlert = (alertItem: alertType) => {
		deleteAlert(alertItem.id)
	}

	return (
		<div className={`ui-alert-manager ${props.className}`}>
			{!!props.errorItems.length && (
				<div className="ui-alert-manager__error block">
					<div className="block__title">Ошибка</div>

					{normalizedErrorItems.map(errorItem => (
						<Alert
							key={`error-item-${errorItem.id}`}
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

					{normalizedSuccessItems.map(successItem => (
						<Alert
							key={`success-item-${successItem.id}`}
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
