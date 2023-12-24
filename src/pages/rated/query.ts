export const fetchRatedMovies = async () => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
				'guest_session_id'
			)}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${
				import.meta.env.VITE_API_KEY
			}`
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

export const fetchRatedTVShows = async () => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
				'guest_session_id'
			)}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${
				import.meta.env.VITE_API_KEY
			}`
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
