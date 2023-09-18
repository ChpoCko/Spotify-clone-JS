// import type { PageLoad } from './$types';
import { fetchRefresh } from '$helpers';

export const load = async ({ fetch: _fetch, parent }) => {
	const fetch = (path) => fetchRefresh(_fetch, path);
	const { user } = await parent();

	const newReleases = fetch('/api/v1/spotify/browse/new-releases?limit=6');
	const featuredPlaylists = fetch('/api/v1/spotify/browse/featured-playlists?limit=6');
	const userPlaylists = fetch(`/api/v1/spotify/users/${user?.id}/playlists?limit=6`);

	const catsRes = await fetch('/api/v1/spotify/browse/categories');
	const catsResJSON = catsRes?.ok ? await catsRes.json() : undefined;

	const randomCats = catsResJSON
		? catsResJSON.categories.items.sort(() => 0.5 - Math.random()).slice(0, 3)
		: [];

	const randomCatsPromises = randomCats.map((cat) =>
		fetch(`/api/v1/spotify/browse/categories/${cat.id}/playlists?limit=6`)
	);

	const [newReleasesRes, featuredPlaylistsRes, userPlaylistsRes, ...randomCatsRes] =
		await Promise.all([newReleases, featuredPlaylists, userPlaylists, ...randomCatsPromises]);

	return {
		newReleases: newReleasesRes?.ok ? newReleasesRes.json() : undefined,
		featuredPlaylists: featuredPlaylistsRes?.ok ? featuredPlaylistsRes.json() : undefined,
		userPlaylists: userPlaylistsRes?.ok ? userPlaylistsRes.json() : undefined,
		homeCategories: randomCats,
		categoriesPlaylists: Promise.all(randomCatsRes.map((res) => (res?.ok ? res.json() : undefined)))
	};
};
