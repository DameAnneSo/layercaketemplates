<script>
	import { onMount } from "svelte";
	import { step } from "../stores/commonStores.js";
	import ScrollyScatterplotCustom from "../custom_charts/scrollyScatterplotCustom.svelte";

	let sections;

	onMount(() => {
		sections = document.querySelectorAll(".foreground > div");

		const options = {
			root: null, // it is the viewport and it's the default value
			threshold: 0, // 0.5 means when 50% of the element is visible. Scale is from 0 to 1. Default is 0. If we set it to 1, it means the element needs to be fully visible to trigger the callback; be careful how it interacts with rootmargin though.
			rootMargin: "-15%",
		};

		const observer = new IntersectionObserver(function (entries, observer) {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				const arrayofEntries = [...entry.target.parentElement.children];

				$step = arrayofEntries.indexOf(entry.target);
				// console.log(
				// 	"entry.target",
				// );
			});
		}, options);

		sections.forEach((section) => {
			observer.observe(section);
		});
	});

	let backgroundColor = "transparent";

	const colourStep = () => {
		if ($step === 0) {
			backgroundColor = "transparent";
		} else if ($step === 1) {
			backgroundColor = "lightblue";
		} else if ($step === 2) {
			backgroundColor = "green";
		} else {
			backgroundColor = "red";
		}
	};

	// $:$step,	colourStep();
</script>

<div class="scrolly">
	<div class="foreground">
		<div class="step_intro"></div>
		<div class="step1">
			<p>
				Step 1: Learning D3 is a massive steep learning curve. But it's worth it!
			</p>
		</div>
		<div class="step2">
			<p>
				Step 2: First off, you need to learn the basics of SVG, HTML and CSS. My advice: don't skimp on advanced CSS, it's a game changer.
			</p>
		</div>
		<div class="step3">
			<p>
				Step 3: Then comes the real bummer: JavaScript. It's a beast of a language.
			</p>
		</div>
		<div class="step4">
			<p>
				Step 4: Ok, now you're ready to tackle D3. Good luck!
			</p>
		</div>

				<div class="step5">
			<p>
				Step 5: But how about we simplify things with LayerCake? It's a Svelte library that makes D3 much easier	to use.
			</p>
		</div>
		<div class="step_final"></div>
	</div>
	<div
		class="background"
		style:background-color={backgroundColor}
	>
<ScrollyScatterplotCustom/>
</div>
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
		background-color: var(--clr-primary-8);
	}
	.step2 {
		background-color: var(--clr-primary-7);
	}
	.step3 {
		background-color: var(--clr-primary-8);
	}
	.step4 {
		background-color: var(--clr-primary-9);
	}

	.background {
		position: sticky;
		z-index: 1;
		top: 0;
		position: -webkit-sticky;
		/* background-color: lavender; */
		height: 99vh;
		grid-row: 1/-1;
		grid-column: 1/-1;
	}
</style>
