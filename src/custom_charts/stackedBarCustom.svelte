<script>
  import { LayerCake } from "layercake";
  import { stackedBarConfig } from "../config_charts/stackedBarConfig.js";

  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import StackedBar from "../graphics/stackedBar.svelte";

  const newStackedData = [
    { key: "owner1", value: 12, category: "cat" },
    { key: "owner1", value: 1, category: "dog" },
    { key: "owner2", value: 2, category: "dog" },
    { key: "owner2", value: 5, category: "cat" },
    { key: "owner3", value: 4, category: "cat" },
    { key: "owner3", value: 0, category: "dog" },
  ];

  // replace stackedBarConfig.data with newStackedData
  const MaxDomain =
    stackedBarConfig.custom.calculateMaxDomain(stackedBarConfig.data);

  // Custom functions
  // replace stackedBarConfig.data with newStackedData
  const colorFunction = (d) => {
    // if first category then red, else blue
    return d.category === stackedBarConfig.data[0].category ? "red" : "blue";
  };
  const custom = {
    colorFunction,
  };

  const config = {
    ...stackedBarConfig,
     // specify newStackedData
    data: newStackedData,
    xDomain: [0, MaxDomain],
    custom,
  };

  // Troubleshooting
  // console.log(stackedBarConfig);
</script>

<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX />
    <AxisY tickMarks={false}/>
    <StackedBar />
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
