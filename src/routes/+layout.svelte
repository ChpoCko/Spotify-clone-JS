<script>
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import 'nprogress/nprogress.css';

	// import type { LayoutData } from './$types';
	import { Navigation } from '$components';
	import { Header } from '$components';
	import { page } from '$app/stores';
	import NProgress from 'nprogress';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { hideAll } from 'tippy.js';

	NProgress.configure({ showSpinner: false });

	let topbar;
	let scrollY;
	let headerOpacity = 0;

	$: if (topbar) {
		headerOpacity = scrollY / topbar.offsetHeight < 1 ? scrollY / topbar.offsetHeight : 1;
	}

	$: user = data.user;

	export let data;

	beforeNavigate(() => {
		hideAll();
		NProgress.start();
	});

	afterNavigate(() => {
		NProgress.done();
	});
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>Spotify{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
</svelte:head>

{#if user}
	<a href="#main-content" class="skip-link">Skip to content</a>
{/if}

<div id="main">
	{#if user}
		<div id="sidebar"><Navigation desktop={true} /></div>
	{/if}
	<div id="content">
		{#if user}
			<div id="topbar" bind:this={topbar}>
				<div
					class="topbar-bg"
					style:background-color={$page.data.color ? $page.data.color : 'var(--header-color)'}
					style:opacity={`${headerOpacity}`}
				/>
				<Header />
			</div>
		{/if}
		<main id="main-content" class:logged-in={user}>
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;

		:global(html.no-js) & {
			@include breakpoint.down('md') {
				display: block;
			}
		}
		#content {
			flex: 1;

			#topbar {
				position: fixed;
				height: var(--header-height);
				padding: 0 1.5rem;
				display: flex;
				align-items: center;
				width: 100%;
				z-index: 100;

				@include breakpoint.up('md') {
					padding: 0 3rem;
					width: calc(100% - var(--sidebar-width));
				}

				:global(html.no-js) & {
					position: sticky;
					top: 0;
					background-color: var(--header-color);
					height: auto;
					padding: 1rem 2rem;

					@include breakpoint.up('md') {
						position: fixed;
					}
				}

				.topbar-bg {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					z-index: -1;
					background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0 0);
				}
			}
			main#main-content {
				padding: 3rem 1.5rem 6rem;
				@include breakpoint.up('md') {
					padding: 3rem 3rem 6rem;
				}
				&.logged-in {
					padding-top: calc(3rem + var(--header-height));

					:global(html.no-js) & {
						@include breakpoint.down('md') {
							padding-top: 3rem;
						}
					}
				}
			}
		}
	}
</style>
