<script>
  import StackedColumn from "./custom_charts/stackedColumnCustom.svelte";
  import StackedBar from "./custom_charts/stackedBarCustom.svelte";
  import Scatterplot from "./custom_charts/scatterplotCustom.svelte";
  import Line from "./custom_charts/lineCustom.svelte";
  import Bar from "./custom_charts/barCustom.svelte";
  import Column from "./custom_charts/columnCustom.svelte";
  import Scrolly from "./components/scrolly.svelte";
  import ImageD3 from "./lib/d3.png";
  import ImageSvelte from "./lib/svelte.png";
  import ImageLayerCake from "./lib/layercake.png";

  import Footer from './components/footer.svelte'

  // set year
  const date = new Date().getFullYear();
</script>

<div class="page-column">
  <div class="hero-center">
    <h1>Dataviz ready to go</h1>
    <p>
      Charts and scrollytelling templates made with D3.js, Svelte and
      LayerCake.js
    </p>
    <div class="icons-section">
      <img src={ImageD3} alt="d3 logo" />
      <img src={ImageSvelte} alt="svelte logo" />
      <img src={ImageLayerCake} alt="layercake logo" />
    </div>
  </div>
</div>
<Scrolly />
<div class="page-column">
  <h1>My gallery of chart templates</h1>
  <Line />
  <Bar />
  <Column />
  <Scatterplot />
  <StackedBar />
  <StackedColumn />
</div>

<Footer />

<style>
  .hero-center {
    min-height: 100vh;
    display: grid;
    place-items: center;
    align-content: center;
  }

  .hero-center h1 {
    font-size: 4rem;
    text-transform: uppercase;
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


</style>
