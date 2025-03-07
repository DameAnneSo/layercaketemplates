<script>
  import { LayerCake } from "layercake";
  import { stackedBarConfig } from "../default_charts/stackedBarConfig.js";

  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import StackedBar from "../graphics/stackedBar.svelte";
  import dataRaw from "../data/stacked_data.csv";
  import Tooltip from "../components/tooltip.svelte";
  const newData = dataRaw.map((d) => ({
    key: d.key,
    value: +d.value,
    category: d.category,
  }));

  // replace stackedBarConfig.data with newData
  const MaxDomain = stackedBarConfig.custom.calculateMaxDomain(newData);

  //// (Optional) Custom functions
  const colorFunction = (d) => {
    return d.category === newData[0].category
      ? "var(--clr-primary-3)"
      : d.category === newData[1].category
        ? "var(--clr-primary-10)"
        : "var(--clr-primary-8)";
  };

  const labelFunction = (d, key, data) => {
    // Only show label if value is not 0
    if (d === 0) return "";
    // Handle plural form
    const doseText = d === 1 ? "dose" : "doses";
    // Return the formatted string with the coffee name
    return `${d} ${doseText}`;
  };

  const tooltipFunction = (tooltipDatum) => {
    const value = tooltipDatum.data[1].get(tooltipDatum.key).value;
    const key = tooltipDatum.key;
    const data = tooltipDatum.data;
    const doseText = value === 1 ? "dose" : "doses";
    return `${data[0]}: ${value} ${doseText} of ${key}`;
  };

  const custom = {
    ariaLabel: "Espresso, Steamed Milk, Milk foam ratios in different coffees",
    colorFunction,
    labelFunction,
    tooltipFunction,
    tooltipId: "stackedBarId",
  };

  const config = {
    ...stackedBarConfig,
    padding: { top: 20, right: 20, bottom: 20, left: 50 },
    data: newData,
    xDomain: [0, MaxDomain],
    yDomain: newData.map((d) => d.key), // This pretipserves original order
    custom,
  };
</script>

<Tooltip tooltipId={"stackedBarId"} let:tooltipDatum>
  <p>
    {tooltipFunction(tooltipDatum)}
  </p>
</Tooltip>
<h2>The stacked bar chart</h2>
<p>
  <span class="category1">Espresso</span>
  <span class="category2">Steamed Milk</span>
  <span class="category3">Milk foam</span> doses in different coffees
</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={3} />
    <AxisY tickMarks={false} />
    <StackedBar />
  </LayerCake>
</div>

<style>
  .chart-container {
    height: 20rem;
    width: 100%;
    margin-bottom: 5rem;
  }

  .category1,
  .category2,
  .category3 {
    padding: 0.2rem;
    margin: 0.1rem;
    border-radius: 0.2rem;
  }

  .category1 {
    background-color: var(--clr-primary-3);
    color: var(--clr-primary-8);
  }

  .category2 {
    background-color: var(--clr-primary-8);
  }

  .category3 {
    background-color: var(--clr-primary-10);
  }
</style>
