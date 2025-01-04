<script>
  import { LayerCake } from "layercake";
  import { columnConfig } from "../default_charts/columnConfig.js";

  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import Column from "../graphics/column.svelte";

  import { scaleBand } from "d3-scale";

  import dataRaw from "../data/bar_data.csv";

  const newData = dataRaw.map((d) => ({
    index: +d.index,
    key: d.key,
    value: +d.value,
    category: d.category,
  }));

  //// Custom functions
  const colorFunction = (d) => {
    return d.category === newData[0].category
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

  //// (Optional) Configuration
  const config = {
    ...columnConfig,
    xScale: scaleBand().padding(0.2),
    data: newData,
    xDomain: newData.map((d) => d.key), // This preserves original order
    custom,
  };
</script>

<h2>The column chart</h2>
<p>↑ Number of toes per animal</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX pinkCircle={false} tickMarks={false} />
    <AxisY ticks={5} />
    <Column />
  </LayerCake>
</div>

<style>
  .chart-container {
    height: 20rem;
    width: 100%;
    margin-bottom: 5rem;
  }
</style>
