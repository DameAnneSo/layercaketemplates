<script>
  import { LayerCake } from "layercake";
  import { barConfig } from "../config_charts/barConfig.js";
  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import Bar from "../graphics/bar.svelte";
  import Tooltip from "../graphics/tooltip.svelte";
  import { scaleBand } from "d3-scale";

  const newData = [
    { key: "owner 1", value: 10, category: "cat" },
    { key: "owner 2", value: 1, category: "dog" },
    { key: "owner 3", value: 2, category: "dog" },
    { key: "owner 4", value: 5, category: "dog" },
    { key: "owner 5", value: 4, category: "cat" },
    { key: "owner 6", value: 3, category: "cat" },
  ];
  // //// Custom functions
  // const colorFunction = (d) => {
  //   // if first category then red, else blue
  //   return d.category === barConfig.data[0].category ? "red" : "blue";
  // };

  const colorFunction = () => "var(--clr-primary-3)";
  const custom = {
    colorFunction,
  };

  //// Configuration
  const config = {
    ...barConfig,
    yScale: scaleBand().padding(0.05),
    //// uncomment to switch  to newData
    data: newData,
    //// uncomment if you don't need any custom function
    custom,
  };

  let evt;
  let hideTooltip = true;
</script>

<h2>The bar chart</h2>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={10} pinkCircle={false} />
    <AxisY tickMarks={false} />
    <Bar />
    <Tooltip />
  </LayerCake>
</div>

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
  */
  .chart-container {
    height: 20rem;
    width: 100%;
  }

  /*
      <Html pointerEvents={false}>
      {#if hideTooltip !== true}
        <Tooltip {evt} let:detail>
          <!-- For the tooltip, do another data join because the hover event only has the data from the geography data -->
          {@const tooltipData = { ...detail.props, ...data.get(detail.props[mapJoinKey]) }}
          {#each Object.entries(tooltipData) as [key, value]}
            {@const keyCapitalized = key.replace(/^\w/, d => d.toUpperCase())}
            <div class="row">
              <span>{keyCapitalized}:</span>
              {typeof value === 'number' ? addCommas(value) : value}
            </div>
          {/each}
        </Tooltip>
      {/if}
    </Html>
 */
</style>
