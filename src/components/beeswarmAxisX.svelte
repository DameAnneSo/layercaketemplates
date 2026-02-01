<script>
export let xScale;
export let height;
export let width;

$: ticks = xScale.ticks(4);
// $:console.log(xScale, height, width);
</script>

<g class="axis x">
  {#each ticks as tick}
    <g class="tick" transform="translate({xScale(tick)}, 0)">
      <text x="6" y={height} fill="grey">
        {tick}
      </text>
      <line
        class="grid-line"
        x1="0"
        x2="0"
        y1="0"
        y2={height}
        stroke="var(--clr-grey-10)"
        stroke-width="1"
      />
    </g>
  {/each}
  <!-- <line
    class="axis-line"
    x1="0"
    x2={width}
    y1={height}
    y2={height}
    stroke="hsla(215, 15%, 55%,1)"
    stroke-width="1"
  /> -->
  <text
    class="axis-title"
    x={width}
    y={height}
    text-anchor="end"
    dominant-baseline="hanging"
    dy="8"
  >
    Duration (minutes) &rarr;
  </text>
</g>
