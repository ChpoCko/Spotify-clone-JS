import { json, redirect } from '@sveltejs/kit';

/**@type {import('@sveltejs/kit').RequestHandler} */
export const POST = ({ cookies, request }) => {
	cookies.delete('refresh_token', { path: '/' });
	cookies.delete('access_token', { path: '/' });

	if (request.headers.get('accept') === 'application/json') {
		return json({ success: true });
	}

	throw redirect(303, '/login');
};
