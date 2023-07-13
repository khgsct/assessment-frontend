export const formatNumber = (value: number) => {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2 })
}
