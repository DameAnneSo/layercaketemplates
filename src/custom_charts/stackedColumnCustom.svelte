<script>
  import { LayerCake } from "layercake";
  import { stackedColumnConfig } from "../config_charts/stackedColumnConfig";

  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import StackedColumn from "../graphics/stackedColumn.svelte";

  const newStackedData = [
    { key: 1, value: 12, category: "cat" },
    { key: 1, value: 1, category: "dog" },
    { key: 2, value: 2, category: "dog" },
    { key: 2, value: 5, category: "cat" },
    { key: 3, value: 4, category: "cat" },
    { key: 3, value: 0, category: "dog" },
  ];

  //// replace stackedColumnConfig.data with newStackedData
  const MaxDomain =
    stackedColumnConfig.custom.calculateMaxDomain(stackedColumnConfig.data);

  //// (Optional) Custom functions 
  //// replace stackedColumnConfig.data with newStackedData
  const colorFunction = (d) => {
    //// if first category then red, else blue
    return d.category === stackedColumnConfig.data[0].category ? "red" : "blue";
  };
  const custom = {
    colorFunction,
  };

  const config = {
    ...stackedColumnConfig,
     //// uncomment to switch to newStackedData
    // data: newStackedData, 
    yDomain: [0, MaxDomain],
    custom,
  };

  //// Troubleshooting
  // console.log(stackedColumnConfig);
</script>

<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX tickMarks={false}//>
    <AxisY />
    <StackedColumn />
  </LayerCake>
</div>

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
  */
  .chart-container {
    height: 20rem;
    width: 100%;
  }
</style>
