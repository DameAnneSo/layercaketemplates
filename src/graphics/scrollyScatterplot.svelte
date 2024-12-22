<script>
	import { getContext } from "svelte";
	import { Svg } from "layercake";
	import { step } from "../stores/commonStores.js";
	const { data, xGet, yGet, width, height, custom } = getContext("LayerCake");

</script>

<Svg>
	<!-- <rect width="100%" height="100%" fill="beige"> </rect> -->
	<g>
		{#each $data as d, i}
			<circle
				cx={$xGet(d)}
				cy={$yGet(d)}
				fill={$custom.colorFunction(d)}
				fill-opacity={$step === 0 ? 0.2 : (i+1 === $step ? 1 : 0.2)}
				r={$step === 0 ? 5 : (i+1 === $step ? 10 : 5)}
			></circle>
		{/each}
	</g>
</Svg>

<style>
   circle {
      transition: r 0.5s ease-in, fill-opacity 1s ease-in;
   }
</style>