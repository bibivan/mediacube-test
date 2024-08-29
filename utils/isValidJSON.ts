export default (str: any) => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
