<script>
  import { LayerCake } from "layercake";
  import { stackedColumnConfig } from "../default_charts/stackedColumnConfig";
  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import StackedColumn from "../graphics/stackedColumn.svelte";
  import dataRaw from "../data/stacked_data.csv";
  import Tooltip from "../components/tooltip.svelte";

  const newData = dataRaw.map((d) => ({
    key: d.key,
    value: +d.value,
    category: d.category,
  }));

  //// replace stackedColumnConfig.data with newStackedData
  const MaxDomain = stackedColumnConfig.custom.calculateMaxDomain(newData);

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

  const tooltipFunction = (d, key, data) => {
    const doseText = d === 1 ? "dose" : "doses";
    return `${data[0]}: ${data[1].get(key).value} ${doseText} of ${key}`;
  };

  const custom = {
    ariaLabel: "Espresso, Steamed Milk, Milk foam ratios in different coffees",
    colorFunction,
    labelFunction,
    tooltipFunction,
    tooltipId: "stackedColumnId",
  };

  const config = {
    ...stackedColumnConfig,
    data: newData,
    yDomain: [0, MaxDomain],
    xDomain: newData.map((d) => d.key), // This preserves original order
    custom,
  };
</script>

<Tooltip tooltipId={"stackedColumnId"} let:tooltipDatum>
  <p>
    {tooltipFunction(
      tooltipDatum.data[1].get(tooltipDatum.key).value,
      tooltipDatum.key,
      tooltipDatum.data
    )}
  </p>
</Tooltip>
<h2>The stacked column chart</h2>
<p>
  <span class="category1">Espresso</span>
  <span class="category2">Steamed Milk</span>
  <span class="category3">Milk foam</span> doses in different coffees
</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX />
    <AxisY />
    <StackedColumn />
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
