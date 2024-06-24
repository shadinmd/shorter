import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth"
import { ReactNode } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropDown"
import cn from "../utils/cn"
import supabase from "../utils/supabase"
import { toast } from "sonner"

const Navbar = () => {

	const { user } = useAuth()

	return (
		<header className="flex text-white items-center justify-between px-5 py-2 md:px-20 md:py-5 w-full">
			<Link to="/" className="text-4xl font-semibold">
				Shorter
			</Link>

			{
				user ?
					<div className="flex items-center gap-2">
						<p className="text-xl font-bold hidden md:block">{user.user_metadata?.user_name || user.email}</p>
						<Menu>
							{
								user.user_metadata?.avatar_url ?
									<img src={user?.user_metadata?.avatar_url} className="size-12" />
									:
									<p
										className="flex items-center justify-center text-2xl font-bold bg-white text-black rounded-full size-12">
										{user.email && user.email[0]}
									</p>
							}
						</Menu>
					</div>
					:
					<Link to={"/login"} className="bg-custom-gray py-2 px-3 font-bold text-lg rounded-md">
						Login
					</Link>
			}
		</header>
	)
}

const Menu = ({ children, className }: { children: ReactNode, className?: string }) => {

	const navigate = useNavigate()

	const logout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			toast.error(error.message)
		}
		navigate("/login")
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn("outline-none", className)}>
				{children}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="text-white bg-black font-bold text-lg">
				<DropdownMenuItem>
					<Link to={"/dashboard"}>
						Dashboard
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={logout} className="cursor-pointer">
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default Navbar
