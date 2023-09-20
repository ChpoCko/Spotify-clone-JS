import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';

/** @type */
export const load = async ({ fetch, params }) => {
	const albumRes = await fetchRefresh(fetch, `/api/v1/spotify/albums/${params.id}`);

	if (!albumRes.ok) {
		throw error(albumRes.status, 'Failed to load album!');
	}

	const albumJSON = await albumRes.json();

	let color = null;
	if (albumJSON.images.length > 0) {
		const colorRes = await fetch();
	}

	return {
		album: albumJSON,
		title: albumJSON.name
	};
};
