import { Auth } from "@supabase/auth-ui-react"
import supabase from "../utils/supabase"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import Navbar from "../components/Navbar"

const Login = () => {

	return (
		<div className="flex flex-col items-center h-screen bg-black">
			<Navbar />
			<div className="flex flex-col text-white w-96 pt-20 px-5">
				<Auth
					redirectTo={`${window.location.origin}/dashboard`}
					supabaseClient={supabase}
					providers={["github"]}
					appearance={{
						theme: ThemeSupa,
						style: {
							input: {
								color: "white"
							}
						}
					}}
				/>
			</div>
		</div>
	)
}

export default Login
