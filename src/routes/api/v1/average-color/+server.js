import { json } from '@sveltejs/kit';
import sharp from 'sharp';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ fetch, url }) => {
	const imageURL = url.searchParams.get('image');

	if (imageURL) {
		const image = await fetch(imageURL).then((res) => res.arrayBuffer());
		const stats = await sharp(Buffer.from(image)).stats();
		const [r, g, b] = stats.channels.map((c) => c.mean);
		return json({ color: `rgba(${r}, ${g}, ${b})` });
	}

	return json({ color: null });
};
