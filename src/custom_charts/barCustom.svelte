<script>
  import { LayerCake } from "layercake";
  import { barConfig } from "../config_charts/barConfig.js";
  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import Bar from "../graphics/bar.svelte";
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
    padding: { top: 20, right: 60, bottom: 20, left: 0 },
    yScale: scaleBand().padding(0.05),
    //// uncomment to switch  to newData
    data: newData,
    //// uncomment if you don't need any custom function
    custom,
  };
</script>

<h2>The bar chart</h2>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={10} pinkCircle={false} />
    <AxisY tickMarks={false} />
    <Bar />
  </LayerCake>
</div>

<style>
  .chart-container {
    height: 20rem;
    width: 100%;
    margin-bottom: 5rem;
  }
</style>
