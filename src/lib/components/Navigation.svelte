<script>
	import logo from '$assets/Spotify_Logo_RGB_White.png';
	// import { tick, type ComponentType } from 'svelte';
	import { Home, ListMusic, Search, Menu, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	import { IconButton } from '$components';

	export let desktop;

	let isMobileMenuOpen = false;
	$: isOpen = desktop || isMobileMenuOpen;

	let openMenuButton;
	let closeMenuButton;
	let lastFocusableElement;

	const menuItems = [
		{
			path: '/',
			label: 'Home',
			icon: Home
		},
		{
			path: '/search',
			label: 'Search',
			icon: Search
		},
		{
			path: '/playlists',
			label: 'Playlists',
			icon: ListMusic
		}
	];

	const menuSwitch = async () => {
		isMobileMenuOpen = !isMobileMenuOpen;
		await tick();
		if (isMobileMenuOpen) {
			closeMenuButton.getButton().focus();
		} else if (!isMobileMenuOpen) {
			openMenuButton.getButton().focus();
		}
	};

	const moveFocusToButtom = (e) => {
		if (desktop) return;
		if (e.key === 'Tab' && e.shiftKey) {
			e.preventDefault();
			lastFocusableElement.focus();
		}
	};
	const moveFocusToTop = (e) => {
		if (desktop) return;
		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();
			closeMenuButton.getButton().focus();
		}
	};
	const handleEscape = (e) => {
		if (e.key === 'Escape' && isMobileMenuOpen) {
			menuSwitch();
		}
	};

	beforeNavigate(() => {
		isMobileMenuOpen = false;
	});
</script>

<svelte:head>
	{#if !desktop && isMobileMenuOpen}
		<style lang="scss">
			body {
				overflow: hidden;
			}

			@include breakpoint.up('md') {
				body {
					overflow: auto;
				}
			}
		</style>
	{/if}
</svelte:head>

<div class="nav-content" class:desktop class:mobile={!desktop}>
	{#if !desktop && isMobileMenuOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="overlay" on:click={menuSwitch} transition:fade={{ duration: 300 }} />
	{/if}
	<nav aria-label="Main">
		{#if !desktop}
			<IconButton
				icon={Menu}
				label="Open menu"
				bind:this={openMenuButton}
				on:click={menuSwitch}
				aria-expanded={isOpen}
				class="menu-button"
			/>
		{/if}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:keyup={handleEscape}
			class="nav-content-inner"
			class:is-hidden={!isOpen}
			style:visibility={isOpen ? 'visible' : 'hidden'}
		>
			{#if !desktop}
				<IconButton
					icon={X}
					label="Close menu"
					bind:this={closeMenuButton}
					on:click={menuSwitch}
					on:keydown={moveFocusToButtom}
					class="close-menu-button"
				/>
			{/if}
			<img src={logo} class="logo" alt="Spotify" />
			<ul>
				{#each menuItems as item, index}
					{@const iconProps = {
						focusable: 'false',
						'aria-hidden': 'true',
						color: 'var(--text-color)',
						size: 26,
						strokeWidth: 2
					}}
					<li class:active={item.path === $page.url.pathname}>
						{#if menuItems.length === index + 1}
							<a bind:this={lastFocusableElement} href={item.path} on:keydown={moveFocusToTop}>
								<svelte:component this={item.icon} {...iconProps} />
								{item.label}</a
							>
						{:else}
							<a href={item.path}>
								<svelte:component this={item.icon} {...iconProps} />
								{item.label}</a
							>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>

<style lang="scss">
	.nav-content {
		.overlay {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: var(--sidebar-color);
			opacity: 0.75;
			z-index: 100;

			@include breakpoint.up('md') {
				display: none;
			}
		}
		.logo {
			max-width: 100%;
			width: 13rem;
		}

		.nav-content-inner {
			padding: 2rem;
			min-width: var(--sidebar-width);
			background-color: var(--sidebar-color);
			height: 100dvh;
			overflow: auto;
			display: none;

			:global(html.no-js) & {
				@include breakpoint.down('md') {
					display: block;
					height: auto;
				}
			}

			ul {
				padding: 0;
				margin: 2rem 0 0;
				list-style: none;

				li {
					&.active {
						a {
							opacity: 1;
						}
					}
					a {
						display: flex;
						align-items: center;
						text-decoration: none;
						color: var(--text-color);
						font-size: 1.4rem;
						font-weight: 500;
						padding: 0.5rem;
						margin: 1rem 0;
						opacity: 0.7;
						transition: opacity 0.2s;

						&:hover,
						&:focus {
							opacity: 1;
						}

						:global(svg) {
							margin-right: 1.2rem;
						}
					}
				}
			}
		}
		&.desktop {
			position: sticky;
			top: 0;
			.nav-content-inner {
				@include breakpoint.up('md') {
					display: block;
				}
			}
		}
		&.mobile .nav-content-inner {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			transition: transform 0.3s, opacity 0.3s;

			&.is-hidden {
				transform: translateX(-100%);
				opacity: 0;
				transition: transform 0.3s, opacity 0.3s, visibility 0.3s;
			}

			@include breakpoint.down('md') {
				display: block;
			}
		}

		:global(.menu-button) {
			@include breakpoint.up('md') {
				display: none;
			}
		}
		:global(.close-menu-button) {
			position: absolute;
			right: 2rem;
			top: 2rem;
		}
	}
</style>
