export const isNotNull = <T>(arg: T): arg is Exclude<T, null> => {
  return arg !== null
}

export const isObject = (elem: unknown): elem is Record<PropertyKey, unknown> => {
  return typeof elem === 'object' && elem !== null && !Array.isArray(elem)
}
