<script>
	import { getCopyrightSymbol } from '$helpers';
	export let data;

	$: album = data.album;

	$: console.log(album);
</script>

<h1>{album.name}</h1>

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

<style lang="scss">
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
