const padding = { top: 20, right:0, bottom: 20, left: 5 };

const barData = [
  { key: "owner 1", value: 0.5, category: "cat" },
  { key: "owner 2", value: 1, category: "dog" },
  { key: "owner 3", value: 2, category: "dog" },
  { key: "owner 4", value: 5, category: "dog" },
  { key: "owner 5", value: 4, category: "cat" },
  { key: "owner 6", value: 3, category: "cat" },
];

const colorFunction = () => "var(--clr-primary-5)";
const labelFunction = (d) => d.key;

const custom = {
  colorFunction,
  labelFunction,
};

export const barConfig = {
  data: barData,
  x: "value",
  y: "key",
  xDomain: [0, null], // null because there is will be a  calculated value for the maxDomain not to overflow
  padding,
};
