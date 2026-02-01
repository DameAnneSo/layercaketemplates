<script>
export let yScale;
export let groupByCategory;
const ticks = yScale.domain();
import { fade } from "svelte/transition";

// Function to split text into two lines
function splitText(text) {
  const words = text.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
}
</script>

<g class="axis y">
  {#each ticks as tick, i}
    {#if groupByCategory}
      <g class="tick" in:fade={{ delay: i * 70 }} out:fade>
        <text
          y={yScale(tick)}
          x={-20}
          text-anchor="end"
          dominant-baseline="middle"
        >
          <tspan x="-20" dy="-0.3em">{splitText(tick)[0]}</tspan>
          <tspan x="-20" dy="1.2em">{splitText(tick)[1]}</tspan>
        </text>
      </g>
    {/if}
  {/each}
</g>
