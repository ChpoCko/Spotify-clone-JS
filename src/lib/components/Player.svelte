<script context="module">
	let current;
</script>

<script>
	import { Pause, Play } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let track;

	let audio;

	const dispatch = createEventDispatcher();

	/**
	 * @type {boolean}
	 */
	let paused = true;

	const onPlay = () => {
		if (current && current !== audio) {
			current.currentTime = 0;
			current.pause();
		}
		current = audio;
		dispatch('play', { track });
	};
	const onPause = () => {
		dispatch('pause', { track });
	};
</script>

<div class="player">
	<audio
		bind:this={audio}
		bind:paused
		controls
		src={track.preview_url}
		on:play={onPlay}
		on:pause={onPause}
	/>
	<button
		aria-label={paused ? `Play ${track.name}` : `Pause ${track.name}`}
		on:click={() => {
			if (paused) {
				audio.play();
			} else {
				audio.pause();
			}
		}}
	>
		{#if paused}
			<Play color="var(--text-color)" aria-hidden focusable="false" />
		{:else}
			<Pause color="var(--text-color)" aria-hidden focusable="false" />
		{/if}
	</button>
</div>

<style lang="scss">
	.player {
		audio {
			display: none;
		}

		button {
			width: 1.2rem;
			height: 1.2rem;
			padding: 0;
			background: none;
			border: none;
			cursor: pointer;

			:global(svg) {
				fill: var(--text-color);
				width: 1.2rem;
				height: 1.2rem;
			}
		}
	}
</style>
