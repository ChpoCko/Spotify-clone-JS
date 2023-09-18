// import type { LayoutServerLoad } from './$types';
import { SPOTIFY_BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, fetch, url }) => {
	const accessToken = cookies.get('access_token');
	if (!accessToken) {
		return {
			user: null
		};
	}
	const refreshToken = cookies.get('refresh_token');

	const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (profileRes.ok) {
		const profile = await profileRes.json();
		return {
			user: profile
		};
	} else if (profileRes.status === 401 && refreshToken) {
		// Refresh both access and refresh tokens
		const refreshRes = await fetch('/api/v1/auth/refresh');
		if (refreshRes.ok) {
			//  If refreshing tokens is done successfuly
			//  redirect the user to the url he previously tried to access
			throw redirect(307, url.pathname);
		}
		return {
			user: null
		};
	} else {
		return {
			user: null
		};
	}
};
