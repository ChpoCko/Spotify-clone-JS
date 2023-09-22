import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ fetch, params }) => {
	const albumRes = await fetchRefresh(fetch, `/api/v1/spotify/albums/${params.id}`);

	if (!albumRes.ok) {
		throw error(albumRes.status, 'Failed to load album!');
	}

	const albumJSON = await albumRes.json();

	let color = null;
	if (albumJSON.images.length > 0) {
		const colorRes = await fetch(
			`/api/v1/average-color?${new URLSearchParams({
				image: albumJSON.images[0].url
			}).toString()}`
		);

		if (colorRes.ok) {
			color = (await colorRes.json()).color;
		}
	}

	return {
		album: albumJSON,
		title: albumJSON.name,
		color
	};
};
