import { SPOTIFY_BASE_URL } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

/**@type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ fetch, cookies, params, url }) => {
	const accessToken = cookies.get('access_token');

	const res = await fetch(`${SPOTIFY_BASE_URL}/${params.path}${url.search}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	const resJSON = await res.json();

	if (resJSON.error) {
		throw error(resJSON.error.status, resJSON.error.message);
	}

	return json(resJSON);
};
