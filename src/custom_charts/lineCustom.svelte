<script>
  import { LayerCake } from "layercake";
  import { lineConfig } from "../default_charts/lineConfig.js";
  import { curveStep } from "d3-shape";
  import AxisX from "../graphics/axisX.svelte";
  import AxisY from "../graphics/axisY.svelte";
  import Line from "../graphics/line.svelte";
  import dataRaw from "../data/line_data.csv";
  // import Tooltip from "../components/tooltip.svelte";
  import SharedTooltip from "../components/SharedTooltip.svelte";
  import Labels from '../components/groupLabels.html.svelte';

  const newData = dataRaw.map((d) => ({
    key: +d.key,
    value: +d.value,
    category: d.category,
  }));

  //// (Optional) Custom functions
  const colorFunction = (d) => {
    return d.category === newData[0].category
      ? "var(--clr-primary-3)"
      : "var(--clr-grey-9)";
  };

  const labelFunction = (d) => {
    return d.key === newData[newData.length - 1].key
      ? d.category === newData[0].category
        ? newData[0].category
        : newData.find((item) => item.category !== newData[0].category).category
      : "";
  };

  const custom = {
    curve: curveStep,
    ariaLabel:
      "Time spent learning dataviz VS levels of confidence I'll be able to pull a line chart",
    colorFunction,
    labelFunction,
    tooltipId: "lineId",
  };

  //// Configuration
  const config = {
    ...lineConfig,
    data: newData,
    custom,
  };
</script>


 <!-- <Labels />
<SharedTooltip tooltipId={"lineId"} let:tooltipDatum>
  <p>
    at stage {tooltipDatum.key}, my {tooltipDatum.category} was {tooltipDatum.value}/10
    of proficiency
  </p>
</SharedTooltip> -->

<h2>The line chart</h2>
<p>
  → Time spent learning dataviz VS ↑ levels of confidence I'll be able to pull a
  line chart<br />
  <span class="category1">expectations</span> Vs
  <span class="category2">reality</span>
</p>
<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX ticks={5} zeroline={true} />
    <AxisY />
    <Line />
  </LayerCake>
</div>

<style>
  .chart-container {
    height: 20rem;
    width: 100%;
    margin-bottom: 5rem;
  }

  .category1,
  .category2 {
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
