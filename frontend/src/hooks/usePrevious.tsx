import { useEffect, useRef } from "react"

/**
 * !!!
 * https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
 */

const usePrevious = <T extends unknown>(value: T): T | undefined => {
	const ref = useRef<T>()

	useEffect(() => {
		ref.current = value
	})

	return ref.current
}

export default usePrevious
