import { redirect } from '@sveltejs/kit';

/**@type {import('@sveltejs/kit').Load} */
export const load = ({ data, url }) => {
	const { user } = data || {};

	if (user && url.pathname === '/login') {
		throw redirect(307, '/');
	}

	if (!user && url.pathname !== '/login') {
		throw redirect(307, '/login');
	}

	return {
		user
	};
};
