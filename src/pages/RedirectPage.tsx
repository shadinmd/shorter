import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MoonLoader } from "react-spinners"
import supabase from "../utils/supabase"
import { toast } from "sonner"

type STATUS = "LOADING" | "NOTFOUND" | "ERROR" | "SUCCESS"

const RedirectPage = () => {

	const params = useParams()

	const [status, setStatus] = useState<STATUS>("LOADING")
	const [message, setMessage] = useState("")
	const id = params.id

	useEffect(() => {
		supabase
			.from("urls")
			.select("*")
			.eq("short_id", id)
			.then(({ data, error }) => {
				if (error) {
					toast.error(error.message)
					setMessage(error.message)
					setStatus("ERROR")
					return
				}

				if (data.length < 1) {
					setStatus("NOTFOUND")
				}

				supabase
					.from("click")
					.insert({
						url_id: id
					})
					.then(({ error }) => {

						if (error) {
							console.log("click not registered")
							console.log(error)
						}
					})

				window.location.assign(data[0].redirect_url)
				setStatus("SUCCESS")
			},)
	}, [id])


	return (
		<div className="flex items-center text-white justify-center h-screen w-full">
			{
				status == "LOADING" ?
					<MoonLoader color="#fff" />
					:
					status == "NOTFOUND" ?
						<div className="flex flex-col items-center gap-2">
							<p className="text-3xl">Not Found</p>
							<p className="text-5xl text-red-500 font-bold">404</p>
							<p className="text-xl">Please verify the link is valid</p>
						</div>
						:
						<p className="">
							{message}
						</p>
			}
		</div>
	)
}

export default RedirectPage
