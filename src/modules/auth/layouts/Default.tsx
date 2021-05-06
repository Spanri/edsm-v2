import React from "react"
import "./Default.scss"

import Boop from "../../../ui-components/Boop"

const AuthDefaultLayout = (props: { children: any }) => {
	return (
		<div className="auth-default">
			<div className="auth-default__small-description">Система электронного документооборота “АНИНА”</div>

			<div className="auth-default-inner">
				<div className="auth-default__description">
					<h1 className="auth-default__description-title">Система электронного документооборота “АНИНА”</h1>

					<div className="auth-default__description-slogan slogan">
						<div className="slogan__title">Наш слоган:</div>
						<div className="slogan__description">
							<span>
								Не гарантируем работоспособность,
								<br />
								зато дизайн вон какой!
							</span>

							<Boop rotation={40} timing={300}>
								<span className="slogan__description-icon">👍</span>
							</Boop>
						</div>
					</div>
				</div>

				<div className="auth-default__children">{props.children}</div>
			</div>
		</div>
	)
}

export default AuthDefaultLayout
