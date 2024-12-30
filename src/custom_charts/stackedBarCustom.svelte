<script>
  import { LayerCake } from "layercake";
  import { stackedBarConfig } from "../config_charts/stackedBarConfig.js";

  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import StackedBar from "../graphics/stackedBar.svelte";
  import dataRaw from "../data/stacked_data.csv";

  const newData = dataRaw.map((d) => ({
    key: d.key,
    value: +d.value,
    category: d.category,
  }));


  // replace stackedBarConfig.data with newData
  const MaxDomain = stackedBarConfig.custom.calculateMaxDomain(
    newData
  );

  //// (Optional) Custom functions
  const colorFunction = (d) => {
    // if first category then clr1, if second clr2, else clr3
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
    ...stackedBarConfig,
    padding: { top: 20, right: 20, bottom: 20, left: 50 },
    data: newData,
    xDomain: [0, MaxDomain],
    yDomain: newData.map((d) => d.key), // This preserves original order
    custom,
  };

</script>

<h2>The stacked bar chart</h2>
<p>
  <span class="category1">Espresso</span>
  <span class="category2">Steamed Milk</span>
  <span class="category3">Milk foam</span> ratios in different coffees
</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={3}/>
    <AxisY tickMarks={false} />
    <StackedBar labels={false}/>
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

  .category1{
    background-color: var(--clr-primary-3);
     color: var(--clr-primary-8);
  }

  .category2 {
    background-color: var(--clr-primary-8);
  }

  .category3{
    background-color: var(--clr-grey-10);
  }
</style>
