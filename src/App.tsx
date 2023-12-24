import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Auth from './pages/auth';
import Home from './pages/home';
import Movie from './pages/movie';
import TVShow from './pages/tvshow';
import Error from './pages/error';
import Rated from './pages/rated';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Navbar />,
			children: [
				{
					index: true,
					element: <Home />
				},
				{
					path: 'auth',
					element: <Auth />
				},
				{
					path: 'rated',
					element: <Rated />
				},
				{
					path: 'movie/:id',
					element: <Movie />
				},
				{
					path: 'tvshow/:id',
					element: <TVShow />
				}
			],
			errorElement: <Error />
		}
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
