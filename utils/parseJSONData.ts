export default <T extends Array<K>, K extends Object>(data: T) => {
  return data.map((item: K) => {
    const transformedItem = {} as K
    Object.entries(item).forEach(([key, value]: [string, TNullable<string>]) => {
      if (isValidJSON(value)) {
        transformedItem[key as keyof K] = JSON.parse(value as string)
      } else {
        transformedItem[key as keyof K] = item[key as keyof K]
      }
    })

    return transformedItem
  })
}
