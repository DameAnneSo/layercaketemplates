<script>
  import { onMount } from "svelte";
  import { step } from "../stores/commonStores.js";
  import ScrollyScatterplotCustom from "../custom_charts/scrollyScatterplotCustom.svelte";

  let sections;

  onMount(() => {
    sections = document.querySelectorAll(".foreground > div");

    const options = {
      root: null, // it is the viewport and it's the default value
      threshold: 0, // 0.5 means when 50% of the element is visible. Scale is from 0 to 1. Default is 0. If we set it to 1, it means the element needs to be fully visible to trigger the callback; be careful how it interacts with rootmargin though.
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
    <div class="step1">
      <h3>Step 1: Learning D3 is a steep learning curve. But it's worth it!</h3>
      <p>
        Embarking on the journey to learn front-end web development and data
        visualisation can be both exciting and rewarding. This website is a
        final project designed to explain the essential steps I have been
        through in 2024.
      </p>
    </div>
    <div class="step2">
      <h3>Step 2: HTML & CSS</h3>
      <p>
        HTML is the standard language for creating web pages. It provides the
        structure of a webpage. CSS is used to style and layout web pages,
        including the design, colours, and fonts. <br />
        Level of difficulty: Easy. HTML and CSS are beginner-friendly and are the
        foundation of web development. They are essential for anyone starting in
        web development.<br />
        My advice: don't skimp on advanced CSS, it's a game changer.
      </p>
    </div>
    <div class="step3">
      <h3>Step 3: SVG</h3>
      <p>
       An XML-based format for vector graphics. It is used to
        create scalable images that can be resized without losing quality. SVG
        is often used for icons, logos, and complex graphics on the web.
        <br />
        Level of difficulty: Easy. Understanding the basics of SVG is straightforward,
        but creating complex graphics can be more challenging.
      </p>
    </div>
    <div class="step4">
      <h3>Step 4: JavaScript</h3>
      <p>
        JavaScript is a programming language that allows you to create dynamic
        and interactive web content. It is used to add functionality to web
        pages, such as form validation, interactive maps, and animations. <br />
        Level of difficulty: Difficult (for me, at least). JavaScript has a steeper
        learning curve compared to HTML and CSS, but it is essential for creating
        interactive web applications.
        <br />
        My advice: build a solid foundation but stick to the basics when you learn
        for the first time. You can always learn more advanced concepts later but
        you want to start dabbling in dataviz as soon as possible.
      </p>
    </div>

    <div class="step5">
      <h3>Step 5: D3.js</h3>
      <p>
       A JavaScript library for creating
        dynamic, interactive data visualisations in web browsers. <br />
        Level of difficulty: Difficult. D3.js requires a good understanding of JavaScript
        and data manipulation. It can be challenging for beginners but is very powerful
        for creating complex visualisations.
        <br />
        My advice: while you are learning the previous languages, experiment with
        the chart libraries built on top of D3.js, such as RawGraphs or Flourish
        or even Observable. This will give you a good understanding of the basics
        of data visualisation.
      </p>
    </div>

    <div class="step6">
      <h3>Step 6: Svelte</h3>
      <p>
        A modern JavaScript framework for building user interfaces.
        You can read more technical explanations online, but the long story
        short for me: it makes Javascript a hell lot more palatable <br />
        Level of difficulty: Moderate. Svelte is easier to learn compared to some
        other frameworks, but it still requires a solid understanding of JavaScript.
        <br />
        My advice: the hardest part for me was not to despair with Javascript and
        D3, and keep going until I got to the Svelte part. But Svelte simplified
        a lot of things for me. So keep going!
      </p>
    </div>

    <div class="step7">
      <h3>Step 7: LayerCake.js</h3>
      <p>
        A library for building data visualisations with Svelte.
        It provides a set of tools that simplifies layering different
        components.
        <br />
        Level of difficulty: Moderate. Using LayerCake.js requires knowledge of both
        Svelte and data visualisation principles. <br />
        My advice: very few online tutorials on LayerCake.js unfortunately. Perhaps
        worth learning once you get frustrated by the fact of having to constantly
        write some of the boring parts of D3.js and Svelte.
      </p>
    </div>

    <div class="step8">
      <h3>Step 8: Scrollytelling Techniques</h3>
      <p>
        Scrollytelling is that cool technique that combines scrolling with
        storytelling to create engaging and interactive narratives. It is often
        used in data journalism and interactive articles. <br />
        Level of difficulty: Moderate and even perhaps easy, because by that point, you are already a HTML, CSS, JavaScript, and data visualisation wizard.
      </p>
    </div>

    <div class="step_final"></div>
  </div>
  <div class="background" style:background-color={backgroundColor}>
    <ScrollyScatterplotCustom />
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
    width: 60ch;
    margin: 75vh auto 0 auto;
    padding: 2rem;
    box-shadow: 0 1px 10px 0px rgba(0, 0, 0, 0.8);
    /* background-color: beige; */
  }

  /* step_final */
  .foreground > div:first-child {
    margin-top: -50vh;
    height: 1px;
    opacity: 0;
    padding: 0;
  }
  /* step_intro */
  .foreground > div:last-child {
    margin-top: 50vh;
    height: 1px;
    opacity: 0;
    padding: 0;
  }
/* 
  .step1 {
    background-color: var(--clr-primary-8);
  }
  .step2 {
    background-color: var(--clr-primary-7);
  }
  .step3 {
    background-color: var(--clr-primary-6);
  }
  .step4 {
    background-color: var(--clr-primary-5);
  } */

  .background {
    position: sticky;
    z-index: 1;
    top: 0;
    position: -webkit-sticky;
    /* background-color: lavender; */
    height: 99vh;
    grid-row: 1/-1;
    grid-column: 1/-1;
  }
</style>
