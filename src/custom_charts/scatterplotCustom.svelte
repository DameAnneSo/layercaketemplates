<script>
  import { LayerCake } from "layercake";
  import { scatterplotConfig } from "../config_charts/scatterplotConfig.js";
  import Scatterplot from "../graphics/scatterplot.svelte";
  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";

  import dataRaw from "../data/scatterplot_data.csv";

  const newData = dataRaw.map((d) => ({
    index: +d.index,
    key: d.key,
    value: +d.value,
    category: d.category,
  }));

  //// (Optional) Custom functions
  // const colorFunction = (d) => {
  //   // if first category then clr1, else clr2
  //   return d.category === newData[0].category
  //     ? "var(--clr-primary-3)"
  //     : "var(--clr-primary-5)";
  // };

  // const custom = {
  //   colorFunction,
  // };

  //// Configuration
  const config = {
    ...scatterplotConfig,
    data: newData,
    //// uncomment if you don't need any custom function
    // custom,
  };

  // console.log(scatterplotConfig);
</script>

<h2>The scatterplot</h2>
<p>→ Number of pets VS ↑ levels of happiness</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={10} gridlines={true} />
    <AxisY gridlines={false} />
    <Scatterplot />
  </LayerCake>
</div>

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
  */
  .chart-container {
    height: 20rem;
    width: 100%;
    margin-bottom: 5rem;
  }
</style>
