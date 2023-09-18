<script>
	import { Section } from '$helpers';
	import { Button, Card } from '$components';
	export let data;

	let sections = [];

	$: {
		if (data.newReleases) {
			sections.push(
				new Section('New Releases', '/sections/new-releases', data.newReleases.albums.items)
			);
		}
		if (data.featuredPlaylists) {
			sections.push(
				new Section(
					'Featured Playlists',
					'/sections/featured-playlists',
					data.featuredPlaylists.playlists.items
				)
			);
		}
		data.homeCategories.forEach((category, index) => {
			const categoryPlaylist = data.categoriesPlaylists[index];
			if (categoryPlaylist) {
				sections.push(
					new Section(category.name, `/category/${category.id}`, categoryPlaylist.playlists.items)
				);
			}
		});

		if (data.featuredPlaylists) {
			sections.push(new Section('Your Playlists', '/playlists', data.userPlaylists.items));
		}
	}
</script>

{#each sections as section}
	<section class="content-row">
		<div class="content-row-header">
			<div class="right">
				<h2 class="section-title">{section.title}</h2>
			</div>
			<div class="left">
				<Button element="a" href={section.path} variant="outline"
					>See All <span class="visually-hidden">{section.title}</span></Button
				>
			</div>
		</div>
		<div class="grid-items">
			{#each section.items as item}
				<div class="grid-item">
					<Card {item} />
				</div>
			{/each}
		</div>
	</section>
{/each}

<style lang="scss">
	.content-row {
		margin-bottom: 4rem;

		.content-row-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 2rem;

			.section-title {
				font-size: 2.2rem;
				font-weight: 600;
				margin: 0;
			}
		}
	}
</style>
