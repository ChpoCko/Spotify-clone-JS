<script>
	import { page } from '$app/stores';
	import { Button, LogoutButton } from '$components';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div class="content">
	<h1>{$page.error.message}</h1>

	{#if $page.status === 404}
		<p>The page you are trying to access cannot be found.</p>

		<div class="buttons">
			<Button element="a" href="/">Home</Button>
			<Button element="a" href="/search">Search</Button>
		</div>
	{/if}

	{#if $page.status === 401}
		<p>Your current session has expired, please logout and login again.</p>
		<LogoutButton />
	{/if}
</div>

<style lang="scss">
	.content {
		text-align: center;

		h1 {
			font-size: 4rem;
		}
		p {
			font-size: 2rem;
		}

		.buttons {
			margin-top: 4rem;

			:global(a) {
				margin: 0 0.5rem;
			}
		}
	}
</style>
