import React from "react"
import "./Auth_Default.scss"
import { useResizeDetector } from "react-resize-detector"

import Boop from "@/shared/ui/Boop"
import Link from "@/shared/ui/Link"

const AuthDefaultLayout = (props: { children: (params: any) => any }) => {
	const { width: parentWidth, height: parentHeight, ref: parentRef } = useResizeDetector()

	return (
		<div className="auth-default">
			<div className="auth-default__small-description">Система электронного документооборота “АНЯ”</div>

			<div className="auth-default-inner">
				<div className="auth-default__description">
					<h1 className="auth-default__description-title">Система электронного документооборота “АНЯ”</h1>

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

				<div ref={parentRef} className="auth-default__children-wrapper">
					<div className="auth-default__children">{props.children({ parentWidth, parentHeight })}</div>
				</div>
			</div>

			<div className="auth-default__copyright">
				<div>© 2021-2024 Spanri</div>
				<Link to={{ pathname: "/faq" }}>Помощь</Link>
			</div>
		</div>
	)
}

export default AuthDefaultLayout
