import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/auth"

const Home = () => {

	const { user } = useAuth()
	const navigate = useNavigate()

	const getStarted = () => {
		if (user) {
			navigate("/dashboard")
		} else {
			navigate("/login")
		}
	}

	return (
		<div className="flex flex-col items-center h-screen text-white bg-black">
			<Navbar />
			<div className="flex flex-col items-center mt-32 h-full w-full px-5 text-center">
				<p className="text-5xl font-bold text-custom-primary">Shorter</p>
				<p className="text-lg font-semibold mt-5">
					Turn lengthy web addresses into compact, manageable links.<br />
					Simplify your URLs for easier sharing and cleaner appearance.
				</p>
				<button onClick={getStarted} className="bg-custom-primary text-black text-xl mt-5 font-bold px-3 py-1 rounded-md">
					Get Started
				</button>
			</div>
		</div>
	)
}

export default Home
