import { scaleBand } from 'd3-scale'
import { calculateMaxDomain } from '../utils/helpers.js'
const colorFunction = () => 'teal'

const padding = { top: 20, right: 0, bottom: 20, left: 0 }

const custom = {
  colorFunction,
  calculateMaxDomain
}

const data = [
  { key: 0.5, value: 0.5, category: 'cat' },
  { key: 1, value: 1, category: 'dog' },
  { key: 2, value: 2, category: 'dog' },
  { key: 3, value: 5, category: 'dog' },
  { key: 4, value: 4, category: 'cat' },
  { key: 5, value: 3, category: 'cat' }
]

const stackedData = [
  { key: 1, value: 1, category: 'cat' },
  { key: 1, value: 1, category: 'dog' },
  { key: 2, value: 2, category: 'dog' },
  { key: 2, value: 5, category: 'cat' },
  { key: 3, value: 4, category: 'cat' },
  { key: 3, value: 0, category: 'dog' }
]

export const stackedColumnConfig = {
  data: stackedData,
  x: 'key',
  y: 'value',
  yDomain: [0, null], // null needs to be fixed with a maxDomain to not overflow
  padding,
  custom,
  xScale: scaleBand().paddingInner(0.05)
}

// "vertiStackedColumn": {
//     "data": "stackedData",
//     "x": "key",
//     "y": "value",
//     "xScale": "scaleBand().paddingInner(0.05)",
//     "yDomain": "[0, MaxDomain]",
//     "padding":"padding",
//     "custom": "custom"
// }
