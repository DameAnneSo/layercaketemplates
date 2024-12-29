<script>
  import { LayerCake } from "layercake";
  import { scatterplotConfig } from "../config_charts/scatterplotConfig.js";
  import Scatterplot from "../graphics/scatterplot.svelte";
  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";

  const newData = [
    { key: 0.5, value: 0.5, category: "cat" },
    { key: 1, value: 1, category: "dog" },
    { key: 2, value: 5, category: "dog" },
    { key: 3, value: 5, category: "dog" },
    { key: 4, value: 4, category: "cat" },
    { key: 5, value: 12, category: "cat" },
  ];

  //// Custom functions
  const colorFunction = (d) => {
    // if first category then clr1, else clr2
    return d.category === scatterplotConfig.data[0].category
      ? "var(--clr-primary-3)"
      : "var(--clr-primary-5)";
  };

  const custom = {
    colorFunction,
  };

  //// Configuration
  const config = {
    ...scatterplotConfig,
    //// uncomment to switch  to newData
    // data: newData,
    //// uncomment if you don't need any custom function
    custom,
  };

  // console.log(scatterplotConfig);
</script>

<h2>The scatterplot</h2>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={5} gridlines={true} />
    <AxisY gridlines={true} />
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
