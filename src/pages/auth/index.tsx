import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from './mutation';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
	const navigate = useNavigate();
	const { mutateAsync, isError } = useMutation({
		mutationFn: mutationLogin
	});
	const handleLogin = async () => {
		await mutateAsync();
		return navigate('/');
	};
		return (
			<Grid
				textAlign='center'
				verticalAlign='middle'
				style={{ height: '100vh' }}
			>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h2' color='violet' textAlign='center'>
						Welcome! Login by registering as a Guest below
					</Header>
					<Form size='large' onSubmit={handleLogin}>
						<Segment stacked>
							<Button color='violet' size='large' fluid>
								Login
							</Button>
						</Segment>
						{isError && <h2>Error</h2>}
					</Form>
				</Grid.Column>
			</Grid>
		);
};

export default Auth;
