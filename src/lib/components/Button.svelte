<script>
	export let element;
	export let variant = 'solid';
	export let className = '';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={element}
	class="button button-{variant} {className}"
	on:click
	{...$$restProps}
>
	<slot />
</svelte:element>

<style lang="scss">
	.button {
		display: inline-block;
		border: none;
		font-weight: 600;
		font-size: 1.4rem;
		border-radius: 20px;
		cursor: pointer;
		padding: 0.7rem 1.5rem;
		text-decoration: none;

		&.button-solid {
			background-color: var(--accent-color);
			color: #000;
			border: 2px solid var(--accent-color);
		}
		&.button-outline {
			background: none;
			color: var(--text-color);
			border: 2px solid;
		}
		&.button-danger {
			background-color: var(--error);
			color: #fff;
			border: 2px solid var(--error);
		}
		&:disabled {
			opacity: 0.8;
			cursor: not-allowed;
		}
		&:hover {
			&.button-solid,
			&.button-danger {
				background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
			}

			&.button-outline {
				background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0 0);
			}
		}
		&:active {
			&.button-solid,
			&.button-danger {
				background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0 0);
			}

			&.button-outline {
				background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
			}
		}
	}
</style>
