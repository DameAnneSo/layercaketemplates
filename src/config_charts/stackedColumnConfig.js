import { scaleBand } from "d3-scale";
import { calculateMaxDomain } from "../utils/helpers.js";
const colorFunction = () => "var(--clr-primary-3)";

const padding = { top: 20, right: 0, bottom: 20, left: 0 };

const custom = {
  colorFunction,
  calculateMaxDomain,
};

const stackedData = [
  { key: "owner1", value: 1, category: "cat" },
  { key: "owner1", value: 1, category: "dog" },
  { key: "owner2", value: 2, category: "dog" },
  { key: "owner2", value: 5, category: "cat" },
  { key: "owner3", value: 4, category: "cat" },
  { key: "owner3", value: 0, category: "dog" },
];

export const stackedColumnConfig = {
  data: stackedData,
  x: "key",
  y: "value",
  yDomain: [0, null], // null needs to be fixed with a maxDomain to not overflow
  padding,
  custom,
  xScale: scaleBand().paddingInner(0.03),
};

