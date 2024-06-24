import { z } from "zod"
import Navbar from "../components/Navbar"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUniqueId } from "../utils/url"
import supabase from "../utils/supabase"
import { useAuth } from "../context/auth"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import URL from "../types/url.type"
import { ScrollArea } from "../components/ScrollArea"

const formSchema = z.object({
	url: z.string().url({ message: "Please enter a valid url" })
})

type formType = z.infer<typeof formSchema>

const Dashboard = () => {

	const { user } = useAuth()
	const [urls, setUrls] = useState<URL[]>([])

	const { formState: { errors }, handleSubmit, register } = useForm<formType>({ resolver: zodResolver(formSchema) })

	const shortenUrl = async (body: formType) => {
		if (user) {

			const shortId = createUniqueId()

			const { data, error } = await supabase
				.from("urls")
				.insert({
					user_id: user.id,
					short_id: shortId,
					redirect_url: body.url
				})
				.select("*")

			if (error) {
				toast.error(error.message)
				return
			}

			console.log(data)
			setUrls(prev => [...prev, ...data])
		}
	}

	useEffect(() => {
		supabase
			.from("urls")
			.select("*")
			.then(({ data, error }) => {
				if (error) {
					toast.error(error.message)
					return
				}

				setUrls(data)
			})
	}, [])

	return (
		<div className="flex flex-col text-white items-center w-full h-screen overflow-hidden">
			<Navbar />
			<div className="flex flex-col items-center mt-10 h-full w-full">
				<p className="text-5xl font-bold">Dashboard</p>
				<form className="flex flex-col items-center mt-5" onSubmit={handleSubmit(shortenUrl)}>
					<div className="flex items-center gap-2">
						<label className="text-lg font-bold">URL:</label>
						<input
							{...register("url")}
							placeholder="Enter a url"
							type="text"
							className="outline-none px-5 py-2 text-black font-semibold rounded-lg"
						/>
					</div>
					{errors.url && <p className="text-red-500 mt-1">{errors.url.message}</p>}
					<button className="bg-white text-black px-3 py-1 text-lg font-bold rounded-lg mt-5">
						Shorten
					</button>
				</form>
				<ScrollArea className="h-full">
					<div>
						{
							urls.map((e, i) => (
								<div
									key={i}
								>
									<div>
										{i + 1}
									</div>
									<p>
										{e.redirect_url}
									</p>
									<p>
										{`${window.location.origin}${e.short_id}`}
									</p>
								</div>
							))
						}
					</div>
				</ScrollArea>
			</div>
		</div >
	)
}

export default Dashboard
