<script>
  import { LayerCake } from "layercake";
  import { scatterplotConfig } from "../default_charts/scatterplotConfig.js";
  import Scatterplot from "../graphics/scatterplot.svelte";
  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";

  import dataRaw from "../data/scatterplot_data.csv";

  const newData = dataRaw.map((d) => ({
    index: +d.index,
    key: d.key,
    value: +d.value,
    category: d.category,
  }));

  //// (Optional) Custom functions
  const colorFunction = () => "var(--clr-primary-3)";

  const labelFunction = (d) => {
    return `${d.key} ${d.key == 1 ? d.category.slice(0, -1) : d.category}`;
  };
  // {tooltipDatum.value <= 5 ? "It's not so nice" : "It's nice"} to own {tooltipDatum.key} {tooltipDatum.key == 1 ? tooltipDatum.category.slice(0, -1) : tooltipDatum.category}

  const custom = {
    ariaLabel: "Number of pets VS levels of happiness",
    colorFunction,
    labelFunction,
    tooltipId:"randomid"
  };

  //// Configuration
  const config = {
    ...scatterplotConfig,
    data: newData,
    // xDomain: [0, 10],  // uncomment if you need to set a custom domain
    // xPadding: [10, 10] // This is useful for adding extra space to a scatter plot so that your circles don't interfere with your y-axis. It's better than fussing with the range since you don't need to add a magic number to other components, like axes
    custom,
  };

  // console.log(scatterplotConfig);
</script>

<h2>The scatterplot</h2>
<p>→ Number of pets VS ↑ levels of happiness</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={10} gridlines={true} />
    <AxisY gridlines={false} />
    <Scatterplot labels={false} />
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
