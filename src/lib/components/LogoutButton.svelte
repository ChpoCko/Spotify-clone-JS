<script>
	import { invalidateAll } from '$app/navigation';
</script>

<form
	action="/api/v1/auth/logout"
	method="post"
	on:submit|preventDefault={async () => {
		const response = await fetch('/api/v1/auth/logout', {
			method: 'POST',
			headers: {
				accept: 'application/json'
			}
		});

		if (response.ok) {
			invalidateAll();
		}
	}}
>
	<button type="submit">Sign out</button>
</form>
