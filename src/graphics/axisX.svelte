<script>
  import { getContext } from "svelte";
  import { Svg } from "layercake";
  const { width, height, xScale, yRange } = getContext("LayerCake");

  // example of a prop that can be passed in in the custom chart
  export let pinkCircle = false;

  /**TICKS**/
  /** Show a vertical mark for each tick. */
  export let tickMarks = true;
  /** The length of the tick mark. */
  export let tickMarkLength = 6;

  /** @type {Number|Array<any>|Function|undefined} [ticks] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function (10 ticks). */
  export let ticks = undefined;

  /** The amount of whitespace between the start of the tick and the chart drawing area (the yRange min). */
  export let tickGutter = 0;

  /**LABELS**/
  /** Instead of centering the text labels on the first and the last items, align them to the edges of the chart. */
  export let snapLabels = false;

  /** A function that passes the current tick value and expects a nicely formatted value in return. */
  export let format = (d) => d;

  /** Optional value passed to the `dx` attribute on the text label. */
  export let dx = 0;

  /** Optional value passed to the `dy` attribute on the text label. */
  export let dy = 12;

  /**GRID AND BASELINE**/
  /** Show gridlines extending into the chart area. */
  export let gridlines = false;

  /** Show a solid line at the bottom. */
  export let baseline = true;

  /**OTHER CALCULATIONS**/
  /**@param {Number} i
   * @param {boolean} sl */
  function textAnchor(i, sl) {
    // Check if special alignment rules should be applied
    if (sl === true) {
      if (i === 0) {
        // If it's the first tick value
        return "start";
      }
      if (i === tickVals.length - 1) {
        // If it's the last tick value
        return "end";
      }
    }
    return "middle"; // Default alignment is centered
  }

  // Calculate the length of the tick label
  $: tickLen = tickMarks === true ? (tickMarkLength ?? 6) : 0;

  // Check if the scale is a band scale
  $: isBandwidth = typeof $xScale.bandwidth === "function";

  // Calculate the tick values based on the input ticks
  $: tickVals = Array.isArray(ticks)
    ? ticks
    : isBandwidth
      ? $xScale.domain()
      : typeof ticks === "function"
        ? ticks($xScale.ticks())
        : $xScale.ticks(ticks);

  // Calculate the half of the band scale, which is used to center the tick marks and labels
  $: halfBand = isBandwidth ? $xScale.bandwidth() / 2 : 0;

  // console.log(Array.isArray(ticks));
</script>

<Svg>
  <g class="axis x-axis" class:snapLabels>
    <!-- example of silly customisation -->
    {#if pinkCircle}
      <circle cx="0" cy="0" r="20" fill="pink" />
    {/if}
    {#each tickVals as tick, i (tick)}
      {#if baseline === true}
        <line class="baseline" y1={$height} y2={$height} x1="0" x2={$width} />
      {/if}
      <g
        class="tick tick-{i}"
        transform="translate({$xScale(tick)},{Math.max(...$yRange)})"
      >
        {#if gridlines === true}
          <line
            class="gridline"
            x1={halfBand}
            x2={halfBand}
            y1={-$height}
            y2="0"
          />
        {/if}
        {#if tickMarks === true}
          <line
            class="tick-mark"
            x1={halfBand}
            x2={halfBand}
            y1={tickGutter}
            y2={tickGutter + tickLen}
          />
        {/if}
        <text
          x={halfBand}
          y={tickGutter + tickLen}
          {dx}
          {dy}
          text-anchor={textAnchor(i, snapLabels)}>{format(tick)}</text
        >
      </g>
    {/each}
  </g></Svg
>

<style>
  .tick {
    font-size: 11px;
  }

  line,
  .tick line {
    stroke: #aaa;
    stroke-dasharray: 2;
  }

  .tick text {
    fill: #666;
  }

  .tick .tick-mark,
  .baseline {
    stroke-dasharray: 0;
  }
  /* This looks slightly better */
  .axis.snapLabels .tick:last-child text {
    transform: translateX(3px);
  }
  .axis.snapLabels .tick.tick-0 text {
    transform: translateX(-3px);
  }
</style>
