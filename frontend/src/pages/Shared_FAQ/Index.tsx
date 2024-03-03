import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logout } from "@/store/profileSlice"
import { useTitle } from "@/hooks"
import Link from "@/shared/ui/Link"

const Shared_FAQ = () => {
	useTitle("Помощь")

	return (
		<div style={{ padding: "30px" }}>
			<h1>Помощь</h1>
			<Link to={{ pathname: "/" }}>На главную</Link>
			<br />
			<h4>Описание в одном предложении</h4>
			<p>Система документооборота для подписи документов несколькими людьми.</p>
			<br />
			<h4>Для чего эта система?</h4>
			<p>
				Чтобы маленький бизнес получил возможность использовать электронный документооборот, не вникая сто тыщ дней в эту тему. Плюс чтобы
				люди подтверждали документы друг друга.
			</p>
			<br />
			<h4>ЦА</h4>
			<p>
				Небольшие не-бизнес коллективы (например, семья или универская группа), которые хотят сделать прозрачную систему хранения документов
				в общем хранилище, одобрения документов и подтверждения просмотра.
			</p>
			<br />
			<h4>Кто конкуренты? (с примерами)</h4>
			<p>Google Drive.</p>
			<br />
			<h4>Что есть в этой системе, чего нет у конкурентов?</h4>
			<p>
				Прозрачная система, показывающая безопасность системы и невозможность несанкционированного доступа. Для всех - Понятный способ
				получения документа, подписи его и передачи далее. Для руководства - удобная система мониторинга подписанных документов.
			</p>
			<br />
			<h4>Насколько ЦА знакома с продуктами-аналогами? </h4>
			<p>
				Типичный офисный работник без углубленных знаний - умеет пользоваться Excel/Word, знает, как искать/создавать/удалять документы в
				Windows, умеет пользоваться Вконтакте (то есть умеет регистрироваться и входить в аккаунт, не будет перезагружать страницу через F5,
				не очень понимают действия с автоподтверждением).
			</p>
			<br />
			<h4>Что не фишка, но обязательное условие работы системы? </h4>
			<p>Удобная загрузка документа в систему, быстрая загрузка страниц, просмотр большинства типов документов в браузере. </p>
			<br />
			<h4>Что система не будет пытаться решить? </h4>
			<p>
				Сервер хранения документов (хранение больших документов). Хотелось бы попробовать сделать децентрализованное хранение, но я хз, как
				такое может работать у сайта в браузере. Создание документов с нуля и их редактирование в браузере. Система общения с другими
				бизнесами. Наша система - продукт для внутреннего использования.
			</p>
			<br />
			<h4>Функции, необходимые для выполнения предназначения системы? (места по важности)</h4>
			<p>
				<li>Уведомление о приходе документа на подпись </li>
				<li>Создание электронной подписи </li>
				<li>Загрузка документа в систему (при том, что он может быть секретный) </li>
				<li>Уведомление о результате процесса подписей документа </li>
				<li>Поиск документа среди тысячи </li>
				<li>Дерево документов, чтобы найти документ, не зная названия и деталей </li>
				<li>Уведомления о продвижении созданного документа</li>
				<li>Хлебные крошки </li>
				<li>История просмотра</li>
			</p>
		</div>
	)
}

export default Shared_FAQ
