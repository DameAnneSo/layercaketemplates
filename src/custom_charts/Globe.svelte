<script>
import world from "$data/world-110m.json";
import * as topojson from "topojson-client";
import data from "$data/cat.json";
import { geoOrthographic, geoPath } from "d3-geo";
import { max } from "d3-array";
import { scaleLinear } from "d3-scale";
import { timer } from "d3-timer";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import { spring } from "svelte/motion";
import { draw } from "svelte/transition";
import { onMount } from "svelte";
import { geoCentroid } from "d3-geo";
import Glow from "../components/globeGlow.svelte";
import Tooltip from "../components/globeTooltip.svelte";
import Legend from "../components/globeLegend.svelte";

let countries = topojson.feature(world, world.objects.countries).features;
let borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

// restructure our country array to include population data
countries.forEach((country) => {
  const metadata = data?.find((d) => d.id === String(country.id));
  if (metadata) {
    country.cat_per_capita = metadata.cat_per_capita;
    country.cat_population = metadata.cat_population;
    country.country = metadata.country;
  }
});

let containerWidth = 0;
let containerHeight = 0;
let width;
let height;
let padding = 15;
$: width = height = Math.max(
  0,
  Math.min(containerWidth, containerHeight) - padding * 2,
);

$: projection = geoOrthographic()
  .scale(width / 2)
  .rotate([$xRotation, $yRotation])
  .translate([width / 2, height / 2]);

$: path = geoPath(projection);

const colorScale = scaleLinear()
  .domain([0, max(data, (d) => d.cat_per_capita)])
  .range(["#f0ccd2", "hsl(348, 25%, 41%)"]);

let xRotation = spring(0, { stiffness: 0.1, damping: 0.4 });
let yRotation = spring(0, { stiffness: 0.1, damping: 0.4 });
let degreesPerFrame = 0.5;

const t = timer(() => {
  if (dragging || tooltipData) return;
  $xRotation += degreesPerFrame;
}, 0);

let globe;
const DRAG_SENSITIVITY = 1;
let dragging = false;

// add drag behavior to the globe
onMount(() => {
  const element = select(globe);
  element.call(
    drag()
      .on("drag", (event) => {
        $xRotation = $xRotation + event.dx * DRAG_SENSITIVITY;
        $yRotation = $yRotation - event.dy * DRAG_SENSITIVITY;
        dragging = true;
      })
      .on("end", () => {
        dragging = false;
      }),
  );
});

let tooltipData;

// center the globe on the selected country
$: if (tooltipData) {
  const center = geoCentroid(tooltipData);
  $xRotation = -center[0];
  $yRotation = -center[1];
}
</script>

<div class="globe-header page-column">
  <h2>The rotating choropleth map</h2>
  <p>Cats across the world | Cat per capita in 2026</p>
  <div class="chart-meta">
    <p>
      Source: <a
        href="https://worldpopulationreview.com/country-rankings/cat-population-by-country"
        >WorldPopulationReview.com</a
      >
    </p>
    <p>
      Inspired by a tutorial from Connor Rothschild’s Newline course, <a
        href="https://www.newline.co/courses/better-data-visualizations-with-svelte/welcome"
        target="_blank">Better Data Visualizations with Svelte</a
      >
    </p>
  </div>
</div>

<div
  class="chart-container"
  bind:clientWidth={containerWidth}
  bind:clientHeight={containerHeight}
>
  <svg {width} {height} bind:this={globe} class:dragging>
    <Glow />
    <!-- globe -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <circle
      cx={width / 2}
      cy={height / 2}
      r={width / 2}
      fill="white"
      filter="url(#glow)"
      on:click={() => {
        tooltipData = null;
      }}
      on:focus={() => {
        tooltipData = null;
      }}
      tabindex="0"
    />
    <!-- countries -->
    <!-- sort so that larger populations are on top -->
    {#each countries.sort((a, b) => (b.cat_per_capita || 0) - (a.cat_per_capita || 0)) as country}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <path
        d={path(country)}
        fill={country.cat_per_capita
          ? colorScale(country.cat_per_capita)
          : "var(--clr-grey-10)"}
        stroke="none"
        on:click={() => (tooltipData = country)}
        on:focus={() => (tooltipData = country)}
        tabindex="0"
      />
    {/each}
    <!-- borders -->
    <path d={path(borders)} fill="none" stroke="var(--clr-primary-3)" />
    <!-- Selected country border -->

    {#if tooltipData}
      {#key tooltipData.id}
        <path
          d={path(tooltipData)}
          fill="none"
          stroke="var(--clr-primary-1)"
          stroke-width="2"
          in:draw
        />
      {/key}
    {/if}
  </svg>

  <Tooltip data={tooltipData} />
</div>

<Legend {colorScale} data={tooltipData} />

<style>
.chart-container {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  min-height: 0;
}


svg {
  overflow: visible;
}

.dragging {
  cursor: grabbing;
}

path {
  cursor: pointer;
}

/* Typically, removing focus styling is a bad idea but in our case we are providing our own visual feedback for selection via the stroke change.
 */
path:focus {
  outline: none;
}

circle:focus {
  outline: none;
}
</style>
