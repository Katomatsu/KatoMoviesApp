import { Card, Grid } from 'semantic-ui-react';
import { DisplayData, DisplayType } from '../../types/types';

interface Props {
	data: DisplayData[];
	displayType: DisplayType;
}

const ColumnDisplay = ({ data, displayType }: Props) => {
	return (
		// <div>
		// 	{props.displayType === DisplayType.Movies
		// 		? props.data[0].title
		// 		: props.data[0].name}
		// </div>
		<Grid
			columns={3}
			padded='vertically'
			stackable
			centered
			verticalAlign='top'
		>
			{data.map((item: DisplayData) => {
				return (
					<Grid.Column key={item.id} textAlign='center' >
						<Card
                            centered
							image={`https://image.tmdb.org/t/p/original${item.poster_path}`}
							header={item.name || item.title}
							meta={`Release Data: ${item.release_date} | Rating: ${item.vote_average}`}
							description={`${item.overview.slice(0, 350)}...`}
						/>
					</Grid.Column>
				);
			})}
		</Grid>
	);
};

export default ColumnDisplay;
