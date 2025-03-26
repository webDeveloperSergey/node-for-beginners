export const getValuesAfterFlag = (arr, flag) => {
  const res = []

  const flagIndex = arr.indexOf(flag)

  for (let i = flagIndex + 1; i < arr.length; i++) {
    if (arr[i].charAt(0) === '-') break
    res.push(arr[i])
  }

  return res
}
