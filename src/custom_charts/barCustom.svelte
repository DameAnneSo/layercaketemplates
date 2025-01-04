<script>
  import { LayerCake } from "layercake";
  import { barConfig } from "../default_charts/barConfig.js";
  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import Bar from "../graphics/bar.svelte";
  import { scaleBand } from "d3-scale";

  import dataRaw from "../data/bar_data.csv";
  const newData = dataRaw.map((d) => ({
    index: +d.index,
    key: d.key,
    value: +d.value,
    category: d.category,
  }));

  //// (Optional) Custom functions
  const colorFunction = (d) => {
    return d.category === barConfig.data[0].category
      ? "var(--clr-primary-3)"
      : "var(--clr-primary-8)";
  };

  const labelFunction = (d) => {
    return d.value === 1 ? d.value + " toe" : d.value + " toes";
  };

  const custom = {
    ariaLabel: "Number of toes per animal",
    colorFunction,
    labelFunction,
  };

  //// Configuration
  const config = {
    ...barConfig,
    padding: { top: 20, right: 20, bottom: 20, left: 50 },
    yScale: scaleBand().padding(0.05),
    yDomain: newData.map((d) => d.key), // This preserves original order
    data: newData,
    custom,
  };
</script>

<h2>The bar chart</h2>
<p>→ Number of toes per animal</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={5} />
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
