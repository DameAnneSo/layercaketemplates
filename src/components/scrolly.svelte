<script>
	// issue: cant seem to toggle the inverse class

	import { onMount } from "svelte";
	let sections;

	onMount(() => {
		sections = document.querySelectorAll(".foreground > div");

		const options = {
			root: null, // it is the viewport and it's the default value
			threshold: 0, // 0.5 means when 50% of the element is visible. Scale is from 0 to 1. Default is 0. If we set it to 1, it means the element needs to be fully visible to trigger the callback but won't work if you use rootMargin with it.
			rootMargin: "0px", // it's the margin around the root. Values are similar to css property. We can set multiple values like "10px 20px 30px 40px". Needs to be in px or %
		};

		const observer = new IntersectionObserver(function (entries, observer) {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				console.log(
					"Element:",
					entry.target.className,
					"Is intersecting:",
					entry.isIntersecting,
					"Has inverse class:",
					entry.target.classList.contains("inverse"),
					observer.unobserve(entry.target) // if you don't want to observe the element anymore, means you don't want to trigger the callback anymore for instance when you scroll back to the top of the page
				);
			});
		}, options);

		sections.forEach((section) => {
			observer.observe(section);
		});
	});
</script>

<div class="scrolly">
	<div class="foreground">
		<div class="step_intro"></div>
		<div class="step1">
			<p>
				Step 1: Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
				nemo voluptate id ducimus pariatur ratione! A accusantium quibusdam
				dolorem praesentium?
			</p>
		</div>
		<div class="step2">
			<p>
				Step 2: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Consectetur optio cumque minus esse in?
			</p>
		</div>
		<div class="step3">
			<p>
				Step 3: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
				Laudantium, voluptates!
			</p>
		</div>
		<div class="step4">
			<p>
				Step 4: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
				pariatur ullam impedit, error iste non, similique ad et porro vitae
				suscipit facilis. Labore numquam omnis porro reprehenderit, velit, ullam
				molestias corrupti fugit officia sed illo cupiditate rem veritatis dicta
				reiciendis cum blanditiis praesentium recusandae officiis, consequatur
				quibusdam. Qui, at dicta.
			</p>
		</div>
		<div class="step_final"></div>
	</div>
	<div class="background"></div>
</div>

<style>
	.scrolly {
		display: grid;
	}

	.foreground {
		position: relative;
		z-index: 2;
		pointer-events: none;
		grid-row: 1/-1;
		grid-column: 1/-1;
	}

	.foreground > div {
		width: 60ch;
		margin: 75vh auto 0 auto;
		padding: 2rem;
		box-shadow: 0 1px 10px 0px rgba(0, 0, 0, 0.8);
		/* background-color: beige; */
	}

	/* step_final */
	.foreground > div:first-child {
		margin-top: -50vh;
		height: 1px;
		opacity: 0;
		padding: 0;
	}
	/* step_intro */
	.foreground > div:last-child {
		margin-top: 50vh;
		height: 1px;
		opacity: 0;
		padding: 0;
	}

	.step1 {
		background-color: lightblue;
	}
	.step2 {
		background-color: lightcoral;
	}
	.step3 {
		background-color: lightgreen;
	}
	.step4 {
		background-color: lightseagreen;
	}

	.inverse {
		color: white;
		background-color: black;
	}

	.background {
		position: sticky;
		z-index: 1;
		top: 0;
		position: -webkit-sticky;
		background-color: lavender;
		height: 99vh;
		grid-row: 1/-1;
		grid-column: 1/-1;
	}
</style>
