<script>
	import { getContext } from "svelte";
	import { Svg, uniques } from "layercake";
	import { stack } from "d3-shape";
	import { index } from "d3-array";

	const { data, xScale, yScale, width, height, custom } =
		getContext("LayerCake");

	let stackedData = [];

	const stackGenerator = stack().value(([, D], key) => D.get(key).value);

	const renderBars = () => {
		const indexedData = index(
			$data,
			(d) => d.key,
			(d) => d.category
		);
		const keys = uniques($data.map((d) => d.category));
		stackGenerator.keys(keys);
		stackedData = stackGenerator(indexedData);
		// console.log(stackedData);
	};

	$: $width, $height, $data, renderBars();
</script>

<Svg>
	{#each stackedData as categoryData}
		{#each categoryData as categoryDatum}
			<!-- {console.log(categoryDatum.data[0])} -->
			<rect
				x={$xScale(categoryDatum[0])}
				width={$xScale(categoryDatum[1]) - $xScale(categoryDatum[0])}
				y={$yScale(categoryDatum.data[0])}
				height={$yScale.bandwidth()}
				fill={$custom.colorFunction({ category: categoryData.key })}
			/>
		{/each}
	{/each}
</Svg>

<style>
</style>
