// Calculate the max domain: useful for the stacked charts // remplace by an extend from d3, non, regarder sur Observable comment on fait pour les stacked charts
export const calculateMaxDomain = data => {
  const sumByKey = data.reduce((acc, d) => {
    acc[d.key] = (acc[d.key] || 0) + d.value
    return acc
  }, {})
  return Math.max(...Object.values(sumByKey))
}
