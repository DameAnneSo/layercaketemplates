<script>
  import { LayerCake } from "layercake";
  import { stackedColumnConfig } from "../config_charts/stackedColumnConfig";

  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import StackedColumn from "../graphics/stackedColumn.svelte";
  import dataRaw from "../data/stacked_data.csv";

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
        ? "var(--clr-primary-8)"
        : "var(--clr-grey-10)";
  };
  const custom = {
    colorFunction,
  };

  const config = {
    ...stackedColumnConfig,
    data: newData,
    yDomain: [0, MaxDomain],
    xDomain: newData.map((d) => d.key), // This preserves original order
    custom,
  };


</script>

<h2>The stacked column chart</h2>
<p>
  <span class="category1">Espresso</span>
  <span class="category2">Steamed Milk</span>
  <span class="category3">Milk foam</span> ratios in different coffees
</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX />
    <AxisY />
    <StackedColumn labels={false} />
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
    background-color: var(--clr-grey-10);
  }
</style>
