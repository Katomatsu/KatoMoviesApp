import { Card, Grid, Form, Label } from 'semantic-ui-react';
import { DisplayData, DisplayType } from '../../types/types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { rateMovie, rateTVShow } from './mutation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
	data: DisplayData[];
	displayType: DisplayType;
	isRated?: boolean;
}

const ColumnDisplay = ({ data, displayType, isRated }: Props) => {
	const [rating, setRating] = useState<number>(0);
	const onSuccess = () => {
		toast.success('Successfully rated!', {
			autoClose: 2000
		});
	};
	const onError = () => {
		toast.error('Something went wrong!!', {
			autoClose: 2000
		});
	};

	const { mutate: rateMovieMutation } = useMutation({
		mutationKey: ['rateMovie'],
		mutationFn: (id: number) => rateMovie(id, rating),
		onSuccess,
		onError
	});

	const { mutate: rateTvshowMutation } = useMutation({
		mutationKey: ['rateTVSHow'],
		mutationFn: (id: number) => rateTVShow(id, rating),
		onSuccess,
		onError
	});

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRating(+event.target.value);
	};

	const rate =
		displayType === DisplayType.Movies
			? rateMovieMutation
			: rateTvshowMutation;

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
					<Grid.Column key={item.id} >
						<Link
							to={
								displayType === DisplayType.Movies
									? `/movie/${item.id}`
									: `/tvshow/${item.id}`
							}
						>
							<Card
								style={{ height: 820 }}
								image={`https://image.tmdb.org/t/p/original${item.poster_path}`}
								header={
									displayType === DisplayType.Movies
										? item.title
										: item.name
								}
                                fluid
								meta={`Release Data: ${item.release_date} | Rating: ${item.vote_average}`}
								description={`${item.overview.slice(
									0,
									350
								)}...`}
							/>
						</Link>
						{isRated ? (
							<Label style={{marginTop: 10}} color='green'>
								Your rating: {item.rating}
							</Label>
						) : (
							''
						)}
						<Form style={{ marginTop: 10 }}>
							<Form.Group>
								<Form.Field>
									<Form.Input
										type='number'
										min='0'
										max='10'
										step='0.5'
										value={rating}
										onChange={event => handleInput(event)}
										action={{
											color: 'violet',
											labelPosition: 'right',
											icon: 'star',
											content: 'Rate',
											onClick: () => rate(item.id)
										}}
									/>
								</Form.Field>
							</Form.Group>
						</Form>
					</Grid.Column>
				);
			})}
		</Grid>
	);
};

export default ColumnDisplay;
