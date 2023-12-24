import { useState } from 'react';
import { Button, Loader } from 'semantic-ui-react';
import ColumnDisplay from './ColumnDisplay';
import { DisplayType } from '../../types/types';

import { fetchMovies, fetchTVShows } from '../auth/query';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

const Home = () => {
	const [displayType, setDisplayType] = useState<DisplayType>(
		DisplayType.Movies
	);

	const {
		data: movieData,
		isLoading: isLoadingMovies,
		isFetched: isFetchedMovies
	} = useQuery({
		queryKey: ['movies'],
		queryFn: fetchMovies
	});
	const {
		data: tvShowData,
		isLoading: isLoadingTVShows,
		isFetched: isFetchedTVShows
	} = useQuery({
		queryKey: ['tvshows'],
		queryFn: fetchTVShows
	});

	if (localStorage.getItem('guest_session_id') === null) {
		return <Navigate to='/auth' />;
	}

	if (isLoadingTVShows || isLoadingMovies) {
		return <Loader active />;
	}

	return (
		<div style={{ marginTop: 50, height: 'auto' }}>
			<Button.Group>
				<Button
					color={
						displayType === DisplayType.Movies ? 'blue' : undefined
					}
					onClick={() => setDisplayType(DisplayType.Movies)}
				>
					Movies
				</Button>
				<Button
					color={
						displayType === DisplayType.TVShows ? 'blue' : undefined
					}
					onClick={() => setDisplayType(DisplayType.TVShows)}
				>
					TV Shows
				</Button>
			</Button.Group>
			{(isFetchedMovies || isFetchedTVShows) && (
				<div style={{ marginTop: 20 }}>
					{displayType === DisplayType.Movies ? (
						<ColumnDisplay
							data={movieData.results}
							displayType={DisplayType.Movies}
						/>
					) : (
						<ColumnDisplay
							data={tvShowData.results}
							displayType={DisplayType.TVShows}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default Home;
