import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import supabase from "../utils/supabase"
import { toast } from "sonner"
import URL from "../types/url.type"
import Click from "../types/click.type"
import Navbar from "../components/Navbar"

const LinkDetails = () => {

	const params = useParams()
	const navigate = useNavigate()

	const [url, setUrl] = useState<URL>()
	const [clicks, setClicks] = useState<Click[]>([])
	const [loading, setLoading] = useState(true)

	const id = params.id

	useEffect(() => {

		if (id) {

			supabase
				.from("urls")
				.select("*")
				.eq("short_id", id)
				.then(({ data, error }) => {

					if (error) {
						toast.error(error.message)
						return
					}

					if (!data) {
						toast.error("URL not found")
						return
					}

					setUrl(data[0])

					supabase
						.from("click")
						.select("*")
						.eq("url_id", id)
						.then(({ data, error }) => {

							if (error) {
								toast.error(error.message)
								return
							}

							setClicks(data)
							setLoading(false)
						})
				})
		}
	}, [id])

	const deleteUrl = useCallback(async () => {
		supabase
			.from("urls")
			.delete()
			.eq("short_id", id)
			.then(({ error }) => {

				if (error) {
					console.log(error)
					toast.error(error.message)
					return
				}

				toast.success("Url Deleted Successfully")
				navigate(-1)
			})
	}, [id, navigate])

	return (
		<div className="flex flex-col text-white items-center w-full px-5 md:px-20 h-screen">
			<Navbar />

			{
				loading ?
					<div className="flex items-center justify-center w-full h-full">
						<p className="text-4xl font-bold text-custom-primary">Loading</p>
					</div> :
					url ?
						<>
							<div className="flex items-center justify-center rounded-md h-full">
								<p className="text-9xl text-custom-primary">{clicks.length}</p>
							</div>
							<div className="flex flex-col gap-3 h-full">
								<Link to={url?.redirect_url} className="text-2xl">{url?.redirect_url}</Link>
								<div className="flex gap-5 text-2xl">
									<p>Id: </p>
									<p>{url?.short_id}</p>
								</div>
								<div className="flex items-center gap-2 w-full">

									<button
										onClick={e => { e.preventDefault(); navigate(-1) }}
										className="bg-custom-primary text-black font-semibold rounded-md p-2"
									>
										Back
									</button>

									<button
										onClick={e => { e.preventDefault(); navigator.clipboard.writeText(`${window.location.origin}/${url?.short_id}`) }}
										className="bg-custom-primary text-black font-semibold p-2 rounded-md"
									>
										Copy Link
									</button>

									<button
										onClick={deleteUrl}
										className="bg-red-500 text-black font-semibold rounded-md p-2"
									>
										Delete
									</button>
								</div>
							</div>

						</> :
						<div className="flex flex-col items-center justify-center gap-5 h-full">
							<p className="text-8xl text-red-500 font-bold">404</p>
							<p className="text-4xl text-red-500 font-bold">Url Not Found</p>
							<button onClick={e => { e.preventDefault(); navigate(-1) }} className="bg-custom-primary text-black text-xl font-bold p-2 rounded-md">
								Go back
							</button>
						</div>
			}
		</div>
	)
}

export default LinkDetails
