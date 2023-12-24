export const mutationLogin = async () => {
	try {
		const res = await fetch(
			'https://api.themoviedb.org/3/authentication/guest_session/new',
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
            throw new Error('something went wrong')
        }

        const data = await res.json()
        localStorage.setItem('guest_session_id', data.guest_session_id);
		return data.guest_session_id;
	} catch (e) {
		console.log(e);
	}
};
