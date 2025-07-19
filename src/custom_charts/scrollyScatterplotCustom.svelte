<script>
  import { LayerCake } from "layercake";
  import { scatterplotConfig } from "../default_charts/scatterplotConfig.js";
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

  //// (Optional) Custom functions
  const colorFunction = (d) => {
    return d.category === scatterplotConfig.data[0].category
      ? "var(--clr-primary-3)"
      : "var(--clr-grey-4)";
  };

  const labelFunction = (d) => {
    return `${d.value}: ${d.category}`;
  };
  
  const custom = {
    ariaLabel: "Number of pets VS levels of happiness",
    colorFunction,
    labelFunction
  };

  //// Configuration
  const config = {
    ...scatterplotConfig,
    data: newData,
    custom,
  };

</script>

<div class="scrolly-column">
  <div class="chart-container">
    <LayerCake {...config} debug={false}>
      <AxisX ticks={5} gridlines={true} />
      <AxisY gridlines={true} />
      <ScrollyScatterplot />
    </LayerCake>
  </div>
</div>

<style>
  .chart-container {
    height: 20rem;
    width: 100%;
  }
</style>
