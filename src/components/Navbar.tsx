import Menu from "semantic-ui-react/dist/commonjs/collections/Menu"
import {Link, Outlet} from 'react-router-dom'

const Navbar = () => {
  return (
		<>
			<Menu fixed='top' size='huge'>
				<Menu.Item as={Link} to={'/'} style={{ fontSize: '1.5rem' }}>
					Home
				</Menu.Item>
				<Menu.Item as={Link} to={'/rated'} style={{ fontSize: '1.5rem' }}>
					Rated
				</Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item
						as={Link}
						to={'/auth'}
						style={{ fontSize: '1.5rem' }}
					>
						Auth
					</Menu.Item>
				</Menu.Menu>
			</Menu>
			<Outlet />
		</>
  );
}

export default Navbar
