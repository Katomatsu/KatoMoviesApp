import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Accordion, Card, Grid, Header, Image, Label, List, Loader, Segment } from 'semantic-ui-react';
import { fetchTVShowDetails } from './query';

type GenreType = {
	id: number;
	name: string;
};

type ProductionCompanyType = {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
};

type Creator = {
	id: number
	credit_id: string
	name: string
	gender: number
	profile_path: string
};

type Networks = {
	id: number
	logo_path: string
	name: string
	origin_country: string
};

type Season = {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
};

const TVShow = () => {
	const { id } = useParams<string>();
	const { data, isLoading } = useQuery({
		queryKey: ['tvshow'],
		queryFn: () => fetchTVShowDetails(id!)
	});

	if (isLoading) {
		return <Loader active />;
	}

    const seasonPanels = data.seasons.map((season: Season) => {
       return {
            key: season.id,
            title: `Season ${season.season_number}`,
            content: {
                content: (<Card style={{height: 70}} meta={season.air_date} description={`${season.episode_count} episodes`}/>)
            }
       }
    }
    )

	return (
		<div style={{ marginTop: 50 }}>
			<Segment>
				<Header>{data.name}</Header>
				<Grid
					columns={2}
					divided
					textAlign='left'
					style={{ marginTop: 20 }}
				>
					<Grid.Row>
						<Grid.Column width={8}>
							<div
								style={{
									display: 'flex',
                                    alignItems: 'center',
									textAlign: 'center',
									justifyContent: 'center',
                                    height: '100%'
								}}
							>
								<Image
									size='medium'
									centered
									src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
								/>
							</div>
						</Grid.Column>
						<Grid.Column width={8}>
							<List>
								<List.Item>
									<List.Header>Created By:</List.Header>
									{data.created_by
										.map((creator: Creator) => creator.name)
										.join(', ')}
								</List.Item>
								<List.Item>
									<List.Header>
										Episodes Run Time:
									</List.Header>
									{data.episode_run_time.join(', ') ||
										"we don't have data"}
								</List.Item>
								<List.Item>
									<List.Header>Genres:</List.Header>
									{data.genres.map((genre: GenreType) => {
										return (
											<Label key={genre.id}>
												{genre.name}
											</Label>
										);
									})}
								</List.Item>
								<List.Item>
									<List.Header>First Air Date:</List.Header>
									{data.ferst_air_date}
								</List.Item>
								<List.Item>
									<List.Header>Networks:</List.Header>
									{data.networks.map((network: Networks) => (
										<Image
											key={network.id}
											src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
											size='small'
											style={{ marginRight: 10 }}
										/>
									))}
								</List.Item>
								<List.Item>
									<List.Header>
										Production Companies:
									</List.Header>
									{data.production_companies
										.map(
											(company: ProductionCompanyType) =>
												company.name
										)
										.join(', ')}
								</List.Item>
								<List.Item>
									<List.Header>
										Number of Episodes:
									</List.Header>
									{data.number_of_episodes}
								</List.Item>
								<List.Item>
									<List.Header>
										Number of Seasons:
									</List.Header>
									{data.number_of_seasons}
								</List.Item>
								<List.Item>
									<List.Header>Vote Average:</List.Header>
									{data.vote_average}
								</List.Item>
								<List.Item>
									<List.Header>Seasons: </List.Header>
									<List.Description
										style={{
											height: 200,
											overflowY: 'scroll'
										}}
									>
										<Accordion
											defaultActiveIndex={0}
											panels={seasonPanels}
											styled
										/>
									</List.Description>
								</List.Item>
							</List>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</div>
	);
};

export default TVShow;
