<script>
  import { LayerCake } from "layercake";
  import { scatterplotConfig } from "../config_charts/scatterplotConfig.js";
  import ScrollyScatterplot from "../graphics/scrollyScatterplot.svelte";
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
      : "var(--clr-grey-4)";
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

<div class="scrolly-column">
  <div class="chart-container">
    <LayerCake {...config} debug={false}>
      <AxisX ticks={5} gridlines={true} />
      <AxisY gridlines={true} />
      <ScrollyScatterplot labels={false} />
    </LayerCake>
  </div>
</div>

<style>
  .scrolly-column {
    margin: 0 auto;
    width: 60%; /* takes room of 60 characters */
    /* height: 100%; */
    max-width: 1200px; /* Limit maximum width for very large screens */
    height: 100%;
    display: grid;
    place-items: center;
  }

  .chart-container {
    height: 20rem;
    width: 100%;
  }
</style>
