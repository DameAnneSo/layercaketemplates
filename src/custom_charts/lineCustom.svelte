<script>
  import { LayerCake } from "layercake";
  import { lineConfig } from "../config_charts/lineConfig.js";
  import { curveStep } from "d3-shape";

  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import Line from "../graphics/line.svelte";

  const newData = [
    { key: 1, value: 13, category: "cat" },
    { key: 2, value: 2, category: "cat" },
    { key: 3, value: 3, category: "cat" },
    { key: 4, value: 4, category: "cat" },
    { key: 5, value: 5, category: "cat" },
    { key: 6, value: 6, category: "cat" },
    { key: 7, value: 7, category: "cat" },
    { key: 8, value: 8, category: "cat" },
    { key: 9, value: 9, category: "cat" },
    // { key: 1, value: 1, category: "dog" },
    // { key:2, value: 3, category: "dog" },
    // { key:3, value: 4, category: "dog" },
    // { key:4, value: 5, category: "dog" },
    // { key:5, value: 6, category: "dog" },
    // { key:6, value: 7, category: "dog" },
    // { key:7, value: 8, category: "dog" },
    // { key:8, value: 9, category: "dog" },
    // { key:9, value: 10, category: "dog" },
  ];

  //// Custom functions
  const colorFunction = (d) => {
    // if first category then clr1, else clr2
    return d.category === lineConfig.data[0].category
      ? "var(--clr-primary-3)"
      : "var(--clr-primary-8)";
  };

  const custom = {
    colorFunction,
    curve: curveStep,
  };

  //// Configuration
  const config = {
    ...lineConfig,
    //// uncomment to switch  to newData
    data: newData,
    //// uncomment if you don't need any custom function
    custom,
  };
</script>

<h2>The line chart</h2>
<p>Levels of confidence I will be able to learn D3 vs time spent learning</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX />
    <AxisY />
    <Line />
  </LayerCake>
</div>

<style>
  .chart-container {
    height: 20rem;
    width: 100%;
    margin-bottom: 5rem;
  }
</style>
