<script>
	import { Music } from 'lucide-svelte';

	export let color;
	export let img;
	export let title;
	export let type;
</script>

<div class="banner">
	<div
		class="banner-gradient"
		style:background-image="linear-gradient(0deg, transparent, {color || 'var(--light-gray)'})"
	/>
	<div class="cover">
		{#if img}
			<img src={img} alt={title} />
		{:else}
			<div class="cover-placeholder">
				<Music focusable="false" aria-hidden color="var(--light-gray)" />
			</div>
		{/if}
	</div>
	<div class="info">
		{#if type}
			<p class="type">{type}</p>
		{/if}
		<h1 class="title">{title}</h1>
		<slot name="meta" />
	</div>
</div>

<div class="content">
	<slot />
</div>

<style lang="scss">
	.content {
		position: relative;
		z-index: 10;
		min-height: 30rem;
		background-image: linear-gradient(0deg, var(--bg-color), rgba(0, 0, 0, 0.1));
		margin: 0 -3rem;
		padding: 3rem;
	}
	.banner {
		position: relative;
		display: flex;
		flex-direction: column;
		margin: calc(-1 * (3rem + var(--header-height))) -3rem 0;
		padding: calc(3rem + var(--header-height)) 3rem 2rem;

		@include breakpoint.up('sm') {
			flex-direction: row;
			align-items: flex-end;
		}

		.banner-gradient {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 150%;
			z-index: 1;
		}

		.info {
			z-index: 10;
			.type {
				text-transform: uppercase;
				font-weight: 600;
				font-size: 1.2rem;
				margin: 0;
			}

			.title {
				font-size: 1.2rem;
				margin: 0.5rem 0 0;

				@include breakpoint.up('md') {
					font-size: 3.6rem;
				}
				@include breakpoint.up('lg') {
					font-size: 5.4rem;
				}
			}
		}
		.cover {
			margin-right: 4rem;
			z-index: 10;

			@include breakpoint.down('sm') {
				margin-right: 0;
				margin-bottom: 3rem;
			}

			img,
			.cover-placeholder {
				width: 100%;
				aspect-ratio: 1;
				object-fit: cover;
				box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);

				@include breakpoint.up('sm') {
					width: 23rem;
				}
				@include breakpoint.up('md') {
					width: 20rem;
				}
				@include breakpoint.up('lg') {
					width: 23rem;
				}
			}

			.cover-placeholder {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: var(--medium-gray);

				:global(svg) {
					width: 40%;
					height: 40%;
				}
			}
		}
	}
</style>
