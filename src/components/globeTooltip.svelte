<script>
export let data;
import { format } from "d3-format";
import { fade } from "svelte/transition";

const suffixFormat = (d) => {
  const f = format(".2s");
  return f(d).replace("G", "B");
};
</script>

{#if data?.country}
  <div class="tooltip" transition:fade>
    <p class="tooltip-title">{data.country}</p>
    <p class="tooltip-subtitle">
      Cats per capita: {data.cat_per_capita?.toFixed(2) || "N/A"}
    </p>
    <p class="tooltip-subtitle">
      Number of cats: {suffixFormat(data.cat_population)}
    </p>
    <p class="instruction-text">Click on the ocean to spin again</p>
  </div>
{/if}

<style>
.tooltip {
  position: absolute;
  bottom: clamp(15px, 3vh, 30px);
  right: max(20px, calc(50vw - 350px));
  text-align: right;
  pointer-events: none;
}

.tooltip-title {
  color: var(--clr-grey-4);
  font-size: clamp(1rem, 2.2vw, 1.4rem);
  font-weight: 500;
}

.tooltip-subtitle {
  color: var(--clr-grey-5);
  font-size: clamp(0.8rem, 1.6vw, 1rem);
  font-weight: 400;
}

.instruction-text {
  color: var(--clr-primary-5);
  font-size: clamp(0.65rem, 1.2vw, 0.85rem);
  text-align: center;
  margin: 0.5rem 0 0 0;
  font-style: italic;
}
</style>
