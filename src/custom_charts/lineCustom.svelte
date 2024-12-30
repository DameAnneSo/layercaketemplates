<script>
  import { LayerCake } from "layercake";
  import { lineConfig } from "../config_charts/lineConfig.js";
  import { curveStep } from "d3-shape";

  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import Line from "../graphics/line.svelte";

  import dataRaw from "../data/line_data.csv";

  const newData = dataRaw.map((d) => ({
    key: +d.key,
    value: +d.value,
    category: d.category,
  }));

  //// (Optional) Custom functions
  const colorFunction = (d) => {
    // if first category then clr1, else clr2
    return d.category === newData[0].category
      ? "var(--clr-primary-3)"
      : "var(--clr-grey-9)";
  };

  const custom = {
    colorFunction,
    curve: curveStep,
  };

  //// Configuration
  const config = {
    ...lineConfig,
    data: newData,
    //// uncomment if you don't need any custom function
    custom,
  };
</script>

<h2>The line chart</h2>
<p>→ Time spent learning dataviz VS ↑ levels of confidence I'll be able to pull a line chart<br />
  <span class="category1">expectations</span> Vs
  <span class="category2">reality</span>
</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={5} zeroline={true} />
    <AxisY />
    <Line labels={false} />
  </LayerCake>
</div>

<style>
  .chart-container {
    height: 20rem;
    width: 100%;
    margin-bottom: 5rem;
  }

  .category1,
  .category2{
    padding: 0.2rem;
    margin: 0.1rem;
    border-radius: 0.2rem;
  }

  .category1 {
    background-color: var(--clr-grey-9);
  }

  .category2 {
    background-color: var(--clr-primary-3);
    color: var(--clr-primary-8);
  }
</style>
