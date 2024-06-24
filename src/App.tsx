import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import RedirectPage from "./pages/RedirectPage"

const App = () => {
	return (
		<div className="bg-black w-full">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/:id" element={<RedirectPage />} />
			</Routes>
		</div>
	)
}

export default App
