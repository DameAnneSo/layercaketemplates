<script>
  import { LayerCake } from "layercake";
  import { barConfig } from "../default_charts/barConfig.js";
  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import ScrollyBar from "../graphics/scrollyBar.svelte";
  import { scaleBand } from "d3-scale";

  // get data from data folder
  import dataRaw from "../data/scrolly_bar_data.csv";

  let newData = dataRaw.map((d) => ({
    index: +d.index,
    key: d.key,
    value: +d.value,
    category: d.special,
  }));

  //// (Optional) Custom functions
  const colorFunction = (d) => {
    return d.category === barConfig.data[0].category
      ? "var(--clr-primary-3)"
      : "var(--clr-primary-8)";
  };

  const labelFunction = (d) => {
    return `${d.value} / 10`;
  };

  const custom = {
    ariaLabel: "Dataviz Stack Components & Learning Curve",
    colorFunction,
    labelFunction,
  };

  //// Configuration
  const config = {
    ...barConfig,
    yDomain: newData.map((d) => d.key), // This preserves original order, with the new data in mind
    padding: { top: 20, right: 0, bottom: 20, left: 30 },
    yScale: scaleBand().padding(0.05),
    //// uncomment to switch  to newData
    data: newData,
    custom,
  };
</script>

<div class="scrolly-column">
  <div class="chart-container">
    <h3>Dataviz Stack Components & Learning Curve</h3>
    <small>Levels of difficulty from a beginner's perspective</small>
    <LayerCake {...config} debug={false}>
      <AxisX ticks={10} gridlines={true} />
      <AxisY tickMarks={false} />
      <ScrollyBar labels={true} />
    </LayerCake>
  </div>
</div>

<style>
  .scrolly-column {
    margin: 0 auto;
    width: 75%;
    max-width: 1200px; /* Limit maximum width for very large screens */
    height: 100%;
    display: grid;
    place-items: center;
  }
  .chart-container {
    height: 20rem;
    width: 100%;
  }

  h3 {
    margin-bottom: 0rem;
  }

  small {
    color: var(--clr-grey-8);
  }
</style>
