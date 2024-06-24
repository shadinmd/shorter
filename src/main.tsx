import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.tsx'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<Toaster richColors />
				<BrowserRouter>
					<App />
				</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
)
