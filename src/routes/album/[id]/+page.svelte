<script>
	import { getCopyrightSymbol } from '$helpers';
	import { ItemPage } from '$components';
	export let data;

	$: album = data.album;
</script>

<ItemPage
	title={album.name}
	type={album.album_type}
	img={album.images.length > 0 ? album.images[0].url : undefined}
	color={null}
>
	<p class="meta" slot="meta">
		<span class="artists">
			{album.artists.map((artist) => artist.name).join(', ')}
		</span>
		<span class="date">{new Date(album.release_date).getFullYear()}</span>
		<span class="tracks-count"
			>{`${album.total_tracks} Track${album.total_tracks > 1 ? 's' : ''}`}</span
		>
	</p>
	<div class="traks">
		<ul>
			{#each album.tracks.items as track}
				<li>{track.name}</li>
			{/each}
		</ul>
	</div>
	<div class="credits">
		<p class="date">
			{new Date(album.release_date).toLocaleDateString('en', {
				dateStyle: 'medium'
			})}
			{#each album.copyrights as copyright}
				<p class="copyright">
					{getCopyrightSymbol(copyright.type)}
					{copyright.text}
				</p>
			{/each}
		</p>
	</div>
</ItemPage>

<style lang="scss">
	.meta {
		font-size: 1.3rem;
		font-weight: 600;
		span {
			margin: 0.5rem;
			&.tracks-count {
				font-weight: 400;
				margin: 0 0 0 0.5rem;
				color: var(--light-gray);
			}
		}
	}
	.credits {
		margin-top: 4rem;

		p {
			color: var(--light-gray);
			margin: 0;
			font-size: 1.1rem;

			&.date {
				font-size: 1.3rem;
			}
		}
	}
</style>
