<script>
import { forceCollide, forceSimulation, forceX, forceY } from "d3-force";
import { scaleLinear, scaleBand, scaleOrdinal, scaleSqrt } from "d3-scale";
import { extent, rollups, mean } from "d3-array";
import AxisX from "../components/beeswarmAxisX.svelte";
import AxisY from "../components/beeswarmAxisY.svelte";
import Legend from "../components/beeswarmLegend.svelte";
import Tooltip from "../components/beeswarmTooltip.svelte";
import { fade } from "svelte/transition";

// Props
export let data;
export let categoryField = "category";
export let valueField = "duration_minutes";
export let sizeField = "people_invited";
export let colorRange = ["#dda0dd", "#fe7f2d", "#fcca46", "#a1c181"];
export let groupByDefault = false;
export let showLegend = true;
export let showTooltip = true;

let hovered;
let hoveredCategory;
let groupByCategory = groupByDefault;

const simulation = forceSimulation(data);

let nodes = [];
simulation.on("tick", () => {
  nodes = simulation.nodes();
});

let width = 400;
let height = 400;
const margin = {
  top: 0,
  right: 30,
  bottom: 25,
  left: 125,
};

$: innerWidth = width - margin.left - margin.right;
$: innerHeight = height - margin.top - margin.bottom;

// Generate the average for each category so that we can sort them by average value
$: categories = rollups(
  data,
  (v) => mean(v, (d) => d[valueField]),
  (d) => d[categoryField],
)
  .sort((a, b) => a[1] - b[1])
  .map((d) => d[0]);

$: colorScale = scaleOrdinal().domain(categories).range(colorRange);

$: radiusScale = scaleSqrt()
  .domain(extent(data, (d) => d[sizeField]))
  .range(width < 568 ? [2, 8] : [3, 15]);

$: xScale = scaleLinear()
  .domain(extent(data, (d) => d[valueField]))
  .range([0, innerWidth]);

$: yScale = scaleBand()
  .domain(categories)
  .range([innerHeight, 0])
  .paddingOuter(0.5);

// Reactive block that sets up the forces
$: {
  simulation
    .force("x", forceX((d) => xScale(d[valueField])).strength(0.8))
    .force(
      "y",
      forceY()
        .y((d) =>
          groupByCategory ? yScale(d[categoryField]) : innerHeight / 2,
        )
        .strength(0.2),
    )
    .force(
      "collide",
      forceCollide().radius((d) => radiusScale(d[sizeField]) + 1),
    )
    .alpha(0.3)
    .alphaDecay(0.0005)
    .restart();
}

$: nodes = simulation.nodes();

function toggleGroup() {
  groupByCategory = !groupByCategory;
  hovered = null;
}
</script>

<h2>The beeswarm chart</h2>
<div class="chart-meta">
  <p>
    Inspired by a tutorial from Connor Rothschild in <a
      href="https://www.newline.co/courses/better-data-visualizations-with-svelte/welcome"
      target="_blank"
      >Better Data Visualizations with Svelte</a
    >
  </p>
</div>

<p class="description">Meeting Analysis by Duration and Category</p>



{#if showLegend}
  <Legend {colorScale} bind:hoveredCategory {radiusScale} />
{/if}

<p class="instructions">
  Click on the chart to separate/aggregate the categories of meetings
</p>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="chart-container" bind:clientWidth={width} on:click={toggleGroup}>
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <svg {width} {height} on:mouseleave={() => (hovered = null)}>
    <g
      class="innerchart"
      transform={`translate(${margin.left}, ${margin.top})`}
    >
      <AxisX {xScale} height={innerHeight} width={innerWidth} />
      <AxisY {yScale} {groupByCategory} />
      {#if hovered}
        <line
          x1={hovered.x}
          x2={hovered.x}
          y1={hovered.y}
          y2={innerHeight}
          stroke={colorScale(hovered[categoryField])}
          stroke-width="2"
        />
      {/if}
      {#each nodes as node, i}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <circle
          in:fade={{ duration: 400 + i * 20 }}
          cx={node.x}
          cy={node.y}
          r={radiusScale(node[sizeField])}
          fill={colorScale(node[categoryField])}
          stroke={hovered || hoveredCategory
            ? hovered === node || hoveredCategory === node[categoryField]
              ? "black"
              : "transparent"
            : "#00000090"}
          opacity={hovered || hoveredCategory
            ? hovered === node || hoveredCategory === node[categoryField]
              ? 1
              : 0.3
            : 1}
          stroke-width="1"
          on:mouseover={() => (hovered = node)}
          on:focus={() => (hovered = node)}
          tabindex="0"
          on:click={(e) => {
            e.stopPropagation();
          }}
        />
      {/each}
    </g>
  </svg>
  {#if hovered && showTooltip}
    <Tooltip data={hovered} {colorScale} {width} />
  {/if}
</div>

<style>
.chart-container {
  position: relative;
  margin-bottom: 5rem;
}

.description {
  margin: 0 0 8px 0;
}

.instructions {
  text-align: left;
  font-size: 13px;
  color: var(--clr-primary-3);
  margin: 8px 0 12px 0;
  font-style: italic;
}

:global(.tick text, .axis-title) {
  font-size: 12px;
  font-weight: 400;
  fill: var(--clr-grey-7);
  user-select: none;
}

:global(.axis-title) {
  font-size: 12px;
  font-weight: 400;
}

:global(.axis) {
  font-size: 10px;
  fill: var(--clr-grey-2);
}

circle {
  transition:
    stroke 300ms ease,
    opacity 300ms ease;
  cursor: pointer;
}
</style>
