/** @type {import('tailwindcss').Config} */
export default {
  content: [
		"./src/**/*.tsx"
	],
  theme: {
    extend: {
			colors: {
				"custom-gray" : "#101010",
				"custom-primary" :"#34b27b"
			}
		},
  },
  plugins: [],
}

