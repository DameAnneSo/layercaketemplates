<script>
import StackedColumn from "./custom_charts/stackedColumnCustom.svelte";
import StackedBar from "./custom_charts/stackedBarCustom.svelte";
import Scatterplot from "./custom_charts/scatterplotCustom.svelte";
import Line from "./custom_charts/lineCustom.svelte";
import Bar from "./custom_charts/barCustom.svelte";
import Column from "./custom_charts/columnCustom.svelte";
import BeeswarmChart from "./custom_charts/beeswarmCustom.svelte";
import Scrolly from "./components/scrolly.svelte";
import ImageD3 from "./lib/d3.png";
import ImageSvelte from "./lib/svelte.png";
import ImageLayerCake from "./lib/layercake.png";

import Globe from "./custom_charts/Globe.svelte";

import Footer from "./components/footer.svelte";

import meetingsData from "$data/meetings_data.js";

// set year
const date = new Date().getFullYear();

const colorRange = [
  "var(--clr-primary-9)",
  "var(--clr-primary-7)",
  "var(--clr-primary-5)",
  "var(--clr-primary-3)",
];
</script>

<div class="page-column">
  <div class="hero-center">
    <h1>Learning D3 & Svelte</h1>
    <p>
      Charts and scrollytelling templates made with D3.js, Svelte and
      LayerCake.js
    </p>
    <div class="icons-section">
      <img src={ImageD3} alt="d3 logo" />
      <img src={ImageSvelte} alt="svelte logo" />
      <img src={ImageLayerCake} alt="layercake logo" />
    </div>
    <h4>keep scrolling 👇</h4>
  </div>
</div>
<Scrolly />
<div class="page-column">
  <h1>My gallery of chart templates</h1>
  <Scatterplot />
  <Line />
  <Bar />
  <Column />
  <StackedBar />
  <StackedColumn />
  <BeeswarmChart
    data={meetingsData}
    categoryField="category"
    valueField="duration_minutes"
    sizeField="people_invited"
    {colorRange}
    showLegend={true}
    showTooltip={true}
    groupByDefault={false}
  />
</div>

<!-- Globe section with 100vh -->
<div class="globe-page-wrapper">
  <Globe />
</div>

<Footer />

<style>
.globe-page-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background-color: var(--clr-primary-9);
}

.hero-center {
  min-height: 100vh;
  display: grid;
  place-items: center;
  align-content: center;
}

h1 {
  font-size: 4rem;
  text-transform: uppercase;
  text-align: center;
}

.hero-center p {
  text-align: center;
}

img {
  width: 3rem;
  height: 3rem;
}
.icons-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

h4 {
  text-transform: uppercase;
  margin-top: 3rem;
}

h4 {
  text-transform: uppercase;
  margin-top: 3rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
