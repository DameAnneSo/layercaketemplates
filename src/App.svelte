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

  import Footer from "./components/footer.svelte";
  import Thanks from "./components/thanks.svelte";

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
</div>
<Thanks />
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
