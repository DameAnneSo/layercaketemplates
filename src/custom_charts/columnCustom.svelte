<script>
  import { LayerCake } from "layercake";
  import { columnConfig } from "../config_charts/columnConfig.js";

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
    // if first category then clr1, else clr2
    return d.category === newData[0].category
      ? "var(--clr-primary-3)"
      : "var(--clr-primary-8)";
  };

  const custom = {
    colorFunction,
  };

  //// (Optional) Configuration
  const config = {
    ...columnConfig,
    xScale: scaleBand().padding(0.2),
    data: newData,
    xDomain: newData.map(d => d.key), // This preserves original order
    //// uncomment if you don't need any custom function
    custom,
  };
</script>

<h2>The column chart</h2>
<p>↑ Number of toes per animal</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX pinkCircle={false} tickMarks={false} />
    <AxisY ticks={5} />
    <Column labels={false}/>
  </LayerCake>
</div>

<style>
  .chart-container {
    height: 20rem;
    width: 100%;
    margin-bottom: 5rem;
  }
</style>
