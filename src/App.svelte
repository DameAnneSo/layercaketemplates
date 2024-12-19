<script>
  import StackedColumn from "./custom_charts/stackedColumnCustom.svelte";
  import StackedBar from "./custom_charts/stackedBarCustom.svelte";
  import Scatterplot from "./custom_charts/scatterplotCustom.svelte";
  import Line from "./custom_charts/lineCustom.svelte";
  import Bar from "./custom_charts/barCustom.svelte";
  import Column from "./custom_charts/columnCustom.svelte";
  import Scrolly from "./components/scrolly.svelte";
  import ImageD3 from "./images/d3.png";
  import ImageSvelte from "./images/svelte.png";
  import ImageLayerCake from "./images/layercake.png";

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

<!-- footer -->
<footer class="footer">
  <ul class="social-icons">
    <li>
      <a
        href="https://www.linkedin.com/in/annesophiepereira/"
        target="_blank"
        class="social-icon"
      >
        <i class="fab fa-linkedin" />
      </a>
    </li>
    <li>
      <a
        href="https://github.com/DameAnneSo"
        target="_blank"
        class="social-icon"
      >
        <i class="fa-brands fa-github"></i>
      </a>
    </li>
    <li>
      <a
        href="https://bsky.app/profile/curiousdata.bsky.social"
        target="_blank"
        class="social-icon"
      >
        <i class="fa-brands fa-bluesky"></i>
      </a>
    </li>
  </ul>
  <p>
    &copy; <span id="date">{date}</span> Anne-Sophie Pereira De Sá. All rights reserved
  </p>
</footer>

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

  .footer {
    margin-top: 2rem;
    height: 12rem;
    padding-bottom: 1rem;
    background-color: var(--clr-primary-1);
    display: grid;
    place-items: center;
  }

  .footer .social-icons {
    margin-bottom: 2rem;
  }

  .footer .social-icon {
    color: var(--clr-primary-5);
  }

  .footer .social-icon:hover {
    color: var(--clr-primary-7);
  }

  .footer p {
    font-size: 1rem;
    text-transform: capitalize;
    color: var(--clr-primary-4);
  }

  .social-icons {
    display: grid;
    margin-top: 3rem;
    width: 20rem;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }

  .social-icon {
    font-size: 2rem;
    transition: --var(transition);
  }
</style>
