<script>
  import { LayerCake } from "layercake";
  import { scatterplotConfig } from "./scatterplotConfig.js";
  import Scatterplot from "../graphics/scatterplot.svelte";

  const newData = [
    { key: 0.5, value: 0.5, category: "cat" },
    { key: 1, value: 1, category: "dog" },
    { key: 2, value: 2, category: "dog" },
    { key: 3, value: 5, category: "dog" },
    { key: 4, value: 4, category: "cat" },
    { key: 5, value: 3, category: "cat" },
  ];

  // // Custom functions
  // const colorFunction = (d) => {
  //   // if first category then red, else blue
  //   return d.category === scatterplotConfig.data[0].category ? "red" : "blue";
  // };
  
  const custom = {
    colorFunction,
    // fill: 'teal' //for one color only
    // ,stroke: 'purple' -- for line charts
  };

  // Configuration
  const config = {
    ...scatterplotConfig,
    // data: newData,
    // yDomain: [0, MaxDomain],
    custom
  };

  // console.log(scatterplotConfig);
</script>

<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <!-- <AxisX />
    <AxisY /> -->
    <Scatterplot />
  </LayerCake>
</div>

<!-- 
TO DO LIST:
Dont understand the intro of LayerCake props 
 https://layercake.graphics/guide#layercake-props

 Padding: doesn that mean we forget about margin top, bottom, left, right?

 Re-read the section about xPadding and xNice and position

note for later: aspectRatio: c'est le truc dont j'ai besoin pour changer layout mobile/desktop!!!

re-read ScaledSvg, 

-->

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
  */
  .chart-container {
    height: 20rem;
    width: 100%;
  }
</style>
