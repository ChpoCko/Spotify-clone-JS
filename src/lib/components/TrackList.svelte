<script>
	import { msToTime } from '$helpers';
	import { Clock8, ListPlus } from 'lucide-svelte';
	import { Player } from '$components';
	import playingGif from '$assets/playing.gif';

	let currentlyPlaying = null;
	let isPaused = true;

	export let tracks;
</script>

<div class="tracks">
	<div class="row header">
		<div class="number-column">
			<span class="number">#</span>
		</div>
		<div class="info-column">
			<span class="track-title">Title</span>
		</div>
		<div class="duration-column">
			<Clock8 aria-hidden focusable="false" color="var(--light-gray)" />
		</div>
		<div class="actions-column" />
	</div>
	{#each tracks as track, index}
		<div class="row" class:is-current={currentlyPlaying === track.id}>
			<div class="number-column">
				{#if currentlyPlaying === track.id && !isPaused}
					<img src={playingGif} class="playing-gif" alt="" />
				{:else}
					<span class="number">{index + 1}</span>
				{/if}
				<div class="player">
					<Player
						{track}
						on:play={(e) => {
							currentlyPlaying = e.detail.track.id;
							isPaused = false;
						}}
						on:pause={(e) => {
							isPaused = currentlyPlaying === e.detail.track.id;
						}}
					/>
				</div>
			</div>
			<div class="info-column">
				<div class="track-title">
					<h4>{track.name}</h4>
					{#if track.explicit}
						<span class="explicit">Explisit</span>
					{/if}
				</div>
				<p class="artists">
					{#each track.artists as artist, artistIndex}
						<a href="/artist/{artist.id}">{artist.name}</a>
						{#if artistIndex < track.artists.length - 1}
							{', '}{/if}
					{/each}
				</p>
			</div>
			<div class="duration-column">
				<span class="duration">{msToTime(track.duration_ms)}</span>
			</div>
			<div class="actions-column">
				<ListPlus aria-hidden focusable="false" />
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.tracks {
		.row {
			display: flex;
			align-items: center;
			padding: 0.7rem 0.5rem;
			border-radius: 4px;

			&.is-current {
				.info-column .track-title h4,
				.number-column span.number {
					color: var(--accent-color) !important;
				}
			}

			&.header {
				border-bottom: 1px solid var(--border);
				border-radius: 0px;
				padding: 0.5rem;
				margin-bottom: 1.5rem;

				.track-title {
					color: var(--light-gray);
					font-size: 1.2rem;
					text-transform: uppercase;
				}

				.duration-column :global(svg) {
					width: 1.6rem;
					height: 1.6rem;
				}
			}

			&:not(.header) {
				&:hover {
					background-color: rgba(245, 245, 245, 0.05);

					.number-column {
						.player {
							display: block;
						}

						span.number,
						.playing-gif {
							display: none;
						}
					}
				}

				.number-column {
					width: 3rem;
					display: flex;
					justify-content: flex-end;
					margin-right: 1.5rem;

					span.number {
						color: var(--light-gray);
						font-size: 1.4rem;
					}

					.playing-gif {
						width: 1.2rem;
					}

					.player {
						display: none;
					}
				}

				.info-column {
					flex: 1;

					.track-title {
						display: flex;
						align-items: center;

						h4 {
							margin: 0;
							font-size: 1.5rem;
							font-weight: 400;
							line-height: 1;
						}

						span.explicit {
							text-transform: uppercase;
							font-size: 0.8rem;
							margin-left: 1rem;
							border: 1px solid;
							padding: 0.2rem 0.3rem;
							border-radius: 2px;
							line-height: 1rem;
							color: var(--light-gray);
						}
					}

					.artists {
						color: var(--light-gray);
						font-size: 1.3rem;
						margin: 0.7rem 0 0;
						line-height: 1;

						a {
							color: inherit;
							text-decoration: none;
						}
					}
				}

				.duration-column {
					span.duration {
						color: var(--light-gray);
						font-size: 1.4rem;
					}
				}

				.actions-column {
					width: 3rem;
					margin-left: 1.5rem;
				}
			}
		}
	}
</style>
