<!--
  @component
  Generates HTML text labels for a nested data structure. It places the label near the y-value of the highest x-valued data point. This is useful for labeling the final point in a multi-series line chart, for example. It expects your data to be an array of objects where each has `values` field that is an array of data objects. It uses the `z` field accessor to pull the text label.
 -->
<script>
  import { getContext } from 'svelte';
  import { max } from 'd3-array';

  const { data, x, y, xScale, yScale, xRange, yRange, z, Html } = getContext('LayerCake');

  /* --------------------------------------------
   * Title case the first letter
   */
  const cap = val => val.replace(/^\w/, d => d.toUpperCase());

  /* --------------------------------------------
   * Put the label on the highest value
   */
  $: left = values => $xScale(max(values, $x)) / Math.max(...$xRange);
  $: top = values => $yScale(max(values, $y)) / Math.max(...$yRange);
</script>

<Html>
{#each $data as group}
  <div
    class="label"
    style="
      top:{top(group.values) * 100}%;
      left:{left(group.values) * 100}%;
    "
  >
    {cap($z(group))}
  </div>
{/each}
</Html>

<style>
  .label {
    position: absolute;
    transform: translate(-100%, -100%) translateY(1px);
    font-size: 13px;
  }
</style>