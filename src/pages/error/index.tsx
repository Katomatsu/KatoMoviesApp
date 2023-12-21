import Navbar from '../../components/Navbar'

const Error = () => {
  return (
		<>
			<Navbar />
			<div style={{marginTop: 50}}>
				<h2>Something went wrong</h2>
				<h2>Please go back and try again</h2>
			</div>
		</>
  );
}

export default Error
