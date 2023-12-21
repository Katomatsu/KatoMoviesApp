export const fetchMovieDetails = async (movieId: string) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
			{
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjEyYzBhNTk2Nzk2YWU1OGFjMGFlMzI1YzIyYzdiMiIsInN1YiI6IjY1N2VmNDk3MTI0YzhkMDdjODM4OTVkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PqKBC6UUGt574PnVrTxCXUENZzriZmFDRXkaYrHqDhk'
				}
			}
		);

		if (!res.ok) {
			throw new Error('something went wrong');
		}

		const data = await res.json();
		return data;
	} catch (e) {
		console.log(e);
	}
};
