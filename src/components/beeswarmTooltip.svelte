<script>
export let data;
export let colorScale;
export let width;
import { fly, fade } from "svelte/transition";

let tooltipWidth;
const xNudge = 5;
const yNudge = 5;

$: xPosition =
  data.x + tooltipWidth + xNudge > width
    ? data.x - tooltipWidth - xNudge
    : data.x + xNudge;

$: yPosition = data.y + yNudge;

// Function to determine if a color is dark
function isColorDark(color) {
  // Create a temporary element to get computed RGB values
  const tempElem = document.createElement("div");
  tempElem.style.color = color;
  document.body.appendChild(tempElem);
  const rgb = window.getComputedStyle(tempElem).color;
  document.body.removeChild(tempElem);

  // Extract RGB values from rgb(r, g, b) string
  const match = rgb.match(/\d+/g);
  if (!match) return false;

  const r = parseInt(match[0]);
  const g = parseInt(match[1]);
  const b = parseInt(match[2]);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance < 0.5;
}

$: categoryColor = colorScale(data.category);
$: textColor = isColorDark(categoryColor) ? "var(--clr-grey-11)" : "var(--clr-grey-2)";
</script>

<div
  class="tooltip"
  in:fly={{ y: 10, duration: 200, delay: 200 }}
  out:fade
  style="position: absolute; 
  top: {yPosition}px; 
  left: {xPosition}px;"
  bind:clientWidth={tooltipWidth}
>
  <h1>meeting #{data.meeting_id.replace("M", "")}</h1>
  <div class="info">
    <span class="score"
      >{data.duration_minutes} min • {data.people_invited} people</span
    >
    <span
      class="category"
      style="background: {categoryColor}; color: {textColor};"
      >{data.category}</span
    >
  </div>
  <span class="bar background"></span>
  <span
    class="bar foreground"
    style="background: {colorScale(data.category)};
    width: {(data.duration_minutes / 120) * 100}%;"
  ></span>
</div>

<style>
.tooltip {
  background: var(--clr-white);
  box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 6px;
  border-radius: 3px;
  pointer-events: none;
  transition:
    top 300ms ease,
    left 300ms ease;
}

h1 {
  font-size: 18px;
  margin: 0 0 4px 0;
  font-weight: 500;
}

.info {
  display: flex;
  justify-content: space-between;
  column-gap: 8px;
  align-items: center;
}

.score {
  font-size: 12px;
}
.category {
  font-size: 11px;
  padding: 3px;
  border-radius: 3px;
  text-transform: uppercase;
  font-weight: 500;
}

.bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
}

.background {
  background: var(--clr-grey-10);
}
</style>
