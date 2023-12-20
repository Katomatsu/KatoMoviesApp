import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import ColumnDisplay from './ColumnDisplay';
import { DisplayType } from '../../types/types';

import { fetchMovies, fetchTVShows } from '../auth/query';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
	const [displayType, setDisplayType] = useState<DisplayType>(
		DisplayType.Movies
	);

    const {data: movieData, isLoading: isLoadingMovies, isFetched: isFetchedMovies} = useQuery({
        queryKey: ['movies'],
        queryFn: fetchMovies
    })
    const {data: tvShowData, isLoading: isLoadingTVShows, isFetched: isFetchedTVShows} = useQuery({
		queryKey: ['tvshows'],
		queryFn: fetchTVShows
	});

	return (
		<div style={{ marginTop: 50, height: 'auto' }}>
			<Button.Group >
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
					Movies
				</Button>
			</Button.Group>

			{(isLoadingMovies || isLoadingTVShows) && <div>Loading...</div>}
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
