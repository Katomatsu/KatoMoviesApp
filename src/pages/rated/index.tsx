import { useState } from 'react';
import { Container, Header, Loader, Menu, Segment } from 'semantic-ui-react';
import { DisplayType } from '../../types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchRatedMovies, fetchRatedTVShows } from './query';
import ColumnDisplay from '../home/ColumnDisplay';
import { Navigate } from 'react-router-dom';

const Rated = () => {
	const [activeTab, setActiveTab] = useState<DisplayType>(DisplayType.Movies);
	const {
		data: ratedMovies,
		isLoading: isLoadingRatedMovies,
		isFetched: isFetchedRatedMovies
	} = useQuery({
		queryKey: ['ratedMovies'],
		queryFn: fetchRatedMovies
	});

	const {
		data: ratedTVShows,
		isLoading: isLoadingRatedTVShows,
		isFetched: isFetchedRatedTVShows
	} = useQuery({
		queryKey: ['ratedTVShows'],
		queryFn: fetchRatedTVShows
	});

	if (localStorage.getItem('guest_session_id') === null) {
		return <Navigate to='/auth' />;
	}
	if (isLoadingRatedMovies || isLoadingRatedTVShows) {
		return <Loader active />;
	}

	return (
		<Container style={{ marginTop: 50 }}>
			<Menu pointing secondary>
				<Menu.Item
					name='Movies'
					active={activeTab === DisplayType.Movies}
					onClick={() => setActiveTab(DisplayType.Movies)}
				/>
				<Menu.Item
					name='TV Shows'
					active={activeTab === DisplayType.TVShows}
					onClick={() => setActiveTab(DisplayType.TVShows)}
				/>
			</Menu>

			{(isFetchedRatedMovies || isFetchedRatedTVShows) && (
				<Segment>
					{activeTab === DisplayType.Movies ? (
						<div>
							<Header as={'h2'}>Rated Movies</Header>

							<ColumnDisplay
								isRated={true}
								data={ratedMovies.results}
								displayType={DisplayType.Movies}
							/>
						</div>
					) : (
						<div style={{ margin: '0 auto' }}>
							<Header as={'h2'}>Rated TV Shows</Header>

							<ColumnDisplay
								data={ratedTVShows.results}
								displayType={DisplayType.TVShows}
								isRated={true}
							/>
						</div>
					)}
				</Segment>
			)}
		</Container>
	);
};

export default Rated;
