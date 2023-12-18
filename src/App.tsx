import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Auth from './pages/auth'

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Navbar />,
			children: [
				{
					index: true,
					element: <h1>Home</h1>
				},
				{
					path: 'auth',
					element: <Auth/>
				},
				{
					path: 'rated',
					element: <h1>Rated</h1>
				}
			]
		}
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
