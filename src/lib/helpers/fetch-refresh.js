import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
/**
 *
 * @param {(input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>} fetch
 * @param {string} path
 */
export default async function fetchRefresh(fetch, path) {
	const req = fetch(path);
	if (!browser) return req;

	const res = await req;
	if (res.status === 401) {
		if (!window.refreshPromise) {
			window.refreshPromise = fetch('/api/v1/auth/refresh').finally(() => {
				window.refreshPromise = null;
			});
		}
		const refreshRes = await window.refreshPromise;
		if (!refreshRes.ok) {
			throw error(401, 'Session expired');
		}
		return fetch(path);
	} else {
		return res;
	}
}
