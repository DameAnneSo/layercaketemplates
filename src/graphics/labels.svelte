<!--
  @component
  Adds HTML text labels based on a given list.
 -->
<script>
  import { getContext } from "svelte";

  const { xGet, yGet, yScale } = getContext("LayerCake");

  /** @type {Array<Object>} labels - An array of objects that contain a field containing text label and data fields. */
  export let labels;

  /** @type {Function} getLabelName= - An accessor function to return the label field on your objects in the `labels` array. */
  export let getLabelName;

  /** @type {Function} [formatLabelName=d => d] - An optional formatting function. */
  export let formatLabelName = (d) => d;

  $: isBandwidth = typeof $yScale.bandwidth === "function";
  $: yShift = isBandwidth ? $yScale.bandwidth() / 2 : 0;
</script>

{#each labels as d}
  <div
    class="label"
    style="
      top:{$yGet(d)+yShift+10}px ;
      left:{$xGet(d)+5}px;
    "
  >
    {formatLabelName(getLabelName(d))}
  </div>
{/each}

<style>
  .label {
    position: absolute;
    /* transform: translate(-50%, -50%); */
    font-size: 12px;
  }
</style>
