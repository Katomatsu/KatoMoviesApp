import { Card, Grid } from 'semantic-ui-react';
import { DisplayData, DisplayType } from '../../types/types';
import { Link } from 'react-router-dom';

interface Props {
	data: DisplayData[];
	displayType: DisplayType;
}

const ColumnDisplay = ({ data, displayType }: Props) => {
	return (
		<Grid
			columns={3}
			padded='vertically'
			stackable
			centered
			verticalAlign='top'
		>
			{data.map((item: DisplayData) => {
				return (
					<Grid.Column key={item.id} textAlign='center'>
						<Link
							to={
								displayType === DisplayType.Movies
									? `/movie/${item.id}`
									: `/tvshow/${item.id}`
							}
						>
							<Card
								centered
								image={`https://image.tmdb.org/t/p/original${item.poster_path}`}
								header={
									displayType === DisplayType.Movies
										? item.title
										: item.name
								}
								meta={`Release Data: ${item.release_date} | Rating: ${item.vote_average}`}
								description={`${item.overview.slice(
									0,
									350
								)}...`}
							/>
						</Link>
					</Grid.Column>
				);
			})}
		</Grid>
	);
};

export default ColumnDisplay;
