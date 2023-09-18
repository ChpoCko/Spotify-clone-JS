<script>
	// import type { Icon } from 'lucide-svelte';
	// import type { ComponentType } from 'svelte';
	// import type { HTMLButtonAttributes } from 'svelte/elements';

	// interface $$Props extends HTMLButtonAttributes {
	// 	icon: ComponentType<Icon>;
	// 	label: string;
	// }

	export let icon;
	export let label;

	let button;

	export function getButton() {
		return button;
	}
</script>

<button bind:this={button} on:click on:mouseover on:focus on:keydown {...$$restProps}>
	<svelte:component this={icon} color="var(--text-color)" aria-hidden="true" focusable="false" />
	<span class="visually-hidden">{label}</span>
</button>

<style lang="scss">
	button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		width: 3.8rem;
		height: 3.8rem;

		:global(svg) {
			vertical-align: middle;
		}
		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
		&:active {
			background-color: var(--menu-background-color);
		}
	}
</style>
