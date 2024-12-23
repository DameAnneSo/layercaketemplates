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
    // console.log(stackedData)
  };
  export let labels = true;

  $: $width, $height, $data, renderBars();
</script>

<Svg>
  {#each stackedData as categoryData}
    {#each categoryData as categoryDatum}
      <!-- {console.log(categoryDatum.data[0])} -->
      <rect
        x={$xScale(categoryDatum.data[0])}
        y={$yScale(categoryDatum[1])}
        height={$yScale(categoryDatum[0]) - $yScale(categoryDatum[1])}
        width={$xScale.bandwidth()}
        fill={$custom.colorFunction({ category: categoryData.key })}
      />
    {/each}

    {#if labels}
      <g class="labels">
        {#each categoryData as categoryDatum}
          <text
            class="label"
            x={$xScale(categoryDatum.data[0]) + $xScale.bandwidth() / 2}
            y={$yScale(categoryDatum[1]) + ($yScale(categoryDatum[0]) - $yScale(categoryDatum[1])) / 2}
            text-anchor="middle"
          >
            {categoryData.key}: {categoryDatum[1] - categoryDatum[0]}
          </text>
        {/each}
      </g>
    {/if}
  {/each}
</Svg>

<style>
  .label {
    fill: var(--clr-primary-5);
    font-size: 0.8rem;
    font-family: var(--ff-secondary);
  }
</style>


