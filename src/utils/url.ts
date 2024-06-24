import { nanoid } from "nanoid"

export const createUniqueId = () => {
	const id = nanoid(10)
	return id
}
