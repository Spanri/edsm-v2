import { useEffect } from "react"

const useTitle = (title: string) => {
	useEffect(() => {
		if (title) {
			document.title = title + " | СЭД АНИНА"
		}
	})
}

export default useTitle
