<script>
  import { onMount } from "svelte";
  import { step } from "../stores/commonStores.js";
  import ScrollyScatterplot from "../custom_charts/scrollyScatterplotCustom.svelte";
  import ScrollyBar from "../custom_charts/scrollyBarCustom.svelte";
  let sections;

  onMount(() => {
    sections = document.querySelectorAll(".foreground > div");

    const options = {
      root: null, // it is the viewport and it's the default value
      threshold: 0.1, // 0.5 means when 50% of the element is visible. Scale is from 0 to 1. Default is 0. If we set it to 1, it means the element needs to be fully visible to trigger the callback; be careful how it interacts with rootmargin though.
      rootMargin: "-15%",
    };

    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const arrayofEntries = [...entry.target.parentElement.children];

        $step = arrayofEntries.indexOf(entry.target);
        // console.log(
        // 	"entry.target",
        // );
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });
  });

  let backgroundColor = "transparent";
  // let backgroundColor = "var(--clr-primary-8)";

  // example of function that changes the background color based on the step (not used here)
  const colourStep = () => {
    if ($step === 0) {
      backgroundColor = "transparent";
    } else if ($step === 1) {
      backgroundColor = "lightblue";
    } else if ($step === 2) {
      backgroundColor = "green";
    } else {
      backgroundColor = "red";
    }
  };

  // $:$step,	colourStep();
</script>

<div class="scrolly">
  <div class="foreground">
    <div class="step_intro"></div>
    <div class="step_subtitle">
      <h2>
        Learning coding for dataviz is a steep learning curve.
      </h2>
      <p>
        This website is designed to showcase what
        I have learned in 2024 and how I have built my tech stack, as someone who is not a developer by trade.
      </p>
    </div>
    <div class="step1">
      <h2>#1: HTML & CSS</h2>
      <p>
        HTML provides the structure of a webpage. CSS is used to style and
        layout web pages<br />
        <strong>Level of difficulty: easy</strong>HTML and CSS are
        beginner-friendly.<br />
        <strong>My advice:</strong> Don't skimp on advanced CSS (animations,
        grid, flexbox, etc.); it will be a game changer later on, allowing you
        to rely on JavaScript as little as possible to add pizzazz to your
        creations. If you have time, practise by building your portfolio
        website,
        <a href="https://curiousdata.netlify.app/" target="_blank">
          like I did.</a
        >
      </p>
      <!-- Correct -->
    </div>

    <div class="step2">
      <h2>#2: SVG</h2>
      <p>
        An XML-based format for vector graphics. It is used to create scalable
        images that can be resized without losing quality.
        <strong>Level of difficulty: easy</strong> Understanding the basics of
        SVG is straightforward.
        <strong>My advice</strong>Even if that's for later down the line, option
        to read Data Sketches or
        <a href="https://www.visualcinnamon.com/blog/" target="_blank">
          Nadieh Bremer's blog</a
        > to get a sense of the creative power of SVGs.
      </p>
    </div>
    <div class="step3">
      <h2>#3: JavaScript</h2>
      <p>
        JavaScript is a programming language that allows you to add
        functionality to web pages, such as form validation or interactive
        buttons. <br />
        <strong>Level of difficulty: Difficult (at least for me)</strong>
        A steeper learning curve, compared to HTML and CSS.
        <strong>My advice</strong>
        Stick to the basics when you learn for the first time. I have lost myself
        into a (great) 40+ hour course, but my goal is not to become a front web
        dev. You want to start dabbling in dataviz as soon as possible.
      </p>
    </div>

    <div class="step4">
      <h2>#4: D3.js</h2>
      <p>
        A JavaScript library for creating dynamic and interactive data
        visualisations.<br />
        <strong>Level of difficulty: borderline discouraging (for me)</strong>
        Challenging for beginners, but don't despair, Svelte and LayerCake.js will
        simplify some bits later on.
        <strong> My advice</strong>While you are learning HTML, CSS, SVG and
        Javascript, experiment with the chart libraries built on top of D3.js,
        such as
        <a href="https://www.rawgraphs.io/" target="_blank"> RawGraphs</a>
        or <a href="https://flourish.studio/" target="_blank"> Flourish</a> or
        <a href="https://observablehq.com/" target="_blank">
          Observable notebooks</a
        >. This is much easier and will give you a good illustration of the
        blocs you will start with.
      </p>
    </div>

    <div class="step5">
      <h2>#5: Svelte</h2>
      <p>
        A modern JavaScript framework for building user interfaces. You can
        start by watching videos by <a
          href="https://www.youtube.com/watch?v=-THp2YVYEFc&list=PL8lFmBcH3vX9s8AmGfgvDBKaWzRRcib9T&ab_channel=newline"
          target="_blank"
        >
          Connor Rothchild or Matthias Stahl</a
        >, but the long story short for me: it makes Javascript and D3 a hell
        lot more palatable.
        <strong>Level of difficulty: moderate</strong> Svelte is easier to learn
        compared to some other frameworks.
        <strong> My advice</strong> The hardest part for me was not to despair with
        Javascript and D3, and keep going until I got to the Svelte part. So keep
        going!
      </p>
    </div>

    <div class="step6">
      <h2>#6: LayerCake.js</h2>
      <p>
        A library for building data visualisations with Svelte. It provides a
        set of tools that simplifies layering different components.
        <br />
        <strong>Level of difficulty: moderate</strong>Using LayerCake.js
        requires knowledge of both Svelte and data visualisation principles.
        <br />
        <strong>My advice</strong> Very few tutorials on LayerCake.js
        unfortunately, outside of the
        <a href="https://layercake.graphics/guide" target="_blank">
          official documentation</a
        >. LayerCake.js is worth learning once you get frustrated with writing
        the same repetitive parts of D3.js and Svelte.
      </p>
    </div>

    <div class="step7">
      <h2>#7: Scrollytelling</h2>
      <p>
        Scrollytelling is this cool technique you are experiencing right now
        that that combines scrolling with storytelling to create engaging and
        interactive narratives. It is often used in data journalism and
        interactive articles<br />
        <strong>Level of difficulty: easy to moderate</strong>By that point, you
        are already a HTML, CSS, JavaScript, and data visualisation wizard.
        <strong>My advice</strong>
        There are many other libraries that can help you with scrollytelling (see
        <a href="https://bsky.app/profile/carlbergstrom.com/post/3lbdskjzjz22w">
          this Bluesky thread</a
        >), personally I have been taught the IntersectionObserver method.
      </p>
    </div>

    <div class="step_final"></div>
  </div>
  <div class="background" style:background-color={backgroundColor}>
    <!-- <ScrollyScatterplot /> -->
    <ScrollyBar />
  </div>
</div>

<style>
  .scrolly {
    display: grid;
  }

  .foreground {
    position: relative;
    z-index: 2;
    pointer-events: none;
    grid-row: 1/-1;
    grid-column: 1/-1;
  }

  .foreground > div {
    max-width: 60ch;
    margin: 75vh auto 0 auto;
    padding: 1.5rem;
    box-shadow: 0 1px 10px 0px rgba(0, 0, 0, 0.8);
    background-color: var(--clr-primary-8);
  }

  /* step_intro */
  .foreground > div:first-child
   {
    margin-top: -60vh;
    height: 1px;
    opacity: 0;
    padding: 0;
  }

  /* step_final */
  .foreground > div:last-child {
    margin-top: 50vh;
    height: 1px;
    opacity: 0;
    padding: 0;
  }


  .background {
    position: sticky;
    z-index: 1;
    top: 0;
    position: -webkit-sticky;
    height: 99vh;
    grid-row: 1/-1;
    grid-column: 1/-1;
  }
</style>
