import { User } from "@supabase/supabase-js"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import supabase from "../utils/supabase"
import { toast } from "sonner"

interface Props {
	user: User | undefined
}

const authContext = createContext<Props>({ user: undefined })

export const AuthProvider = ({ children }: { children: ReactNode }) => {

	const [user, setUser] = useState<User | undefined>()

	useEffect(() => {

		supabase.auth.getSession()
			.then(({ data, error }) => {
				if (error) {
					toast.error(error.message)
					return
				}

				if (data.session != null)
					supabase.auth.getUser()
						.then(({ data, error }) => {

							if (error) {
								toast.error(error.message)
								return
							}

							console.log(data)
							setUser(data.user)
						})
			})

	}, [])

	useEffect(() => {

		const { data: authSubscription } = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (event == "SIGNED_IN") {
					setUser(session?.user)
				} else if (event == "SIGNED_OUT") {
					setUser(undefined)
				}
			}
		)

		return () => {
			authSubscription.subscription.unsubscribe()
		}
	})

	return (
		<authContext.Provider value={{ user }}>
			{children}
		</authContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(authContext)
}
