<script>
	import logo from '$assets/Spotify_Logo_RGB_White.png';
	import cover from '$assets/cover.png';
	import { Button } from '$components';
</script>

<div class="wrapper">
	<div class="content">
		<img src={logo} alt="Spotify" class="logo" />
		<h1>EGP 0.00 for 3 months of Premium</h1>
		<p>Enjoy ad-free music listening, offline playback, and more. Cancel anytime.</p>
		<div class="buttons">
			<Button
				element="a"
				variant="outline"
				href="https://www.spotify.com"
				target="_blank"
				rel="noopener noreferrer">Sign Up</Button
			>
			<Button element="a" href="/api/v1/auth/login">Log In</Button>
		</div>
	</div>
	<div class="cover">
		<img src={cover} alt="Svelte album cover" />
	</div>
</div>

<style lang="scss">
	:global(body) {
		background-image: linear-gradient(230deg var(--sidebar-color), var(--bg-color));
		height: 100dvh;
	}
	.wrapper {
		display: flex;
		width: 100%;
		max-width: 120rem;
		margin: 8rem auto 0;
		align-items: center;
		flex-direction: column;
		@include breakpoint.up('md') {
			flex-direction: row;
		}
	}

	.content {
		flex: 1.8;

		h1 {
			font-size: 4rem;
		}
		p {
			font-size: 2rem;
		}

		.buttons {
			margin-top: 4rem;
			:global(.button) {
				margin-right: 1rem;
				padding: 1rem 2rem;
				text-transform: uppercase;
			}
		}
		.logo {
			width: 17rem;
			max-width: 100%;
			margin-bottom: 3rem;
		}
	}

	.cover {
		flex: 1;
		margin-top: 4rem;
		@include breakpoint.up('md') {
			margin-top: 0;
			margin-left: 2rem;
		}
		img {
			max-width: 100%;
		}
	}
</style>
