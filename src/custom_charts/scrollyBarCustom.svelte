<script>
  import { LayerCake } from "layercake";
  import { barConfig } from "../config_charts/barConfig.js";
  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import Bar from "../graphics/bar.svelte";
  import { scaleBand } from "d3-scale";
  import dataRaw from "../data/learning_data.csv";

  // get data from learning_data.csv in the data folder
  import { onMount } from "svelte";

  onMount(() => {
    draw();
  });

  let newData = dataRaw.map((d) => ({
    key: d.key,
    value: +d.value,
    category: d.special,
  }));
  console.log(newData);

  // Draw the chart
  let hasDrawn = false;
  const draw = () => {
    setTimeout(() => {
      hasDrawn = true;
    }, 500);
  };

  // //// Custom functions
  const colorFunction = (d) => {
    // if first category then clr1, else clr2
    return d.category === barConfig.data[0].category
      ? "var(--clr-primary-3)"
      : "var(--clr-primary-8)";
  };

  // const colorFunction = () => "var(--clr-primary-3)";
  const custom = {
    colorFunction,
  };

  //// Configuration
  const config = {
    ...barConfig,
    padding: { top: 20, right: 60, bottom: 20, left: 50 },
    yScale: scaleBand().padding(0.05),
    //// uncomment to switch  to newData
    data: newData,
    //// uncomment if you don't need any custom function
    custom,
  };
</script>

<div class="page-column">
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={10} gridlines={true} />
    <AxisY tickMarks={false} />
    <Bar />
  </LayerCake>
</div>
</div>

<style>
  .page-column {
    height: 100%;
    display: grid;
    place-items: center;
  }
  .chart-container {
    height: 20rem;
    width: 100%;
  }
</style>
