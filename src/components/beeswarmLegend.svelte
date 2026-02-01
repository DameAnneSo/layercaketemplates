<script>
export let colorScale;
export let hoveredCategory;
export let radiusScale;
const ticks = colorScale.domain();

// Get domain for size legend
$: sizeDomain = radiusScale.domain();
$: sizeValues = [
  sizeDomain[0],
  Math.round((sizeDomain[0] + sizeDomain[1]) / 2),
  sizeDomain[1],
];
</script>

<div
  class="category-legend"
  on:mouseleave={() => {
    hoveredCategory = null;
  }}
>
  {#each colorScale.domain() as category}
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <p
      on:mouseover={() => (hoveredCategory = category)}
      class:unhoverered={hoveredCategory && hoveredCategory !== category}
    >
      <span style="background-color: {colorScale(category)}"></span>
      {category}
    </p>
  {/each}
</div>

<div class="size-legend">
  <span class="size-label">People invited</span>
  <svg width="220" height="55">
    {#each sizeValues as value, i}
      <g transform="translate({25 + i * 65}, 20)">
        <circle
          cx="0"
          cy="0"
          r={radiusScale(value)}
          fill="var(--clr-grey-10)"
          stroke="var(--clr-grey-7)"
          stroke-width="1"
        />
        <text
          x="0"
          y="28"
          text-anchor="middle"
          font-size="11px"
          fill="var(--clr-grey-6)"
        >
          {value}
        </text>
      </g>
    {/each}
  </svg>
</div>

<style>
.category-legend {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 5px;
}

.category-legend span {
  width: 9px;
  height: 9px;
  display: inline-block;
  border-radius: 50%;
  border: 1px solid var(--clr-grey-8);
}

p {
  font-size: 14px;
  display: flex;
  align-items: center;
  column-gap: 3px;
  transition: opacity 300ms ease;
  cursor: pointer;
  margin: 0;
}

.unhoverered {
  opacity: 0.4;
}

.size-legend {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
}

.size-label {
  font-size: 14px;
  white-space: nowrap;
  color: var(--clr-grey-7);
}
</style>
