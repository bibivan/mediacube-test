type useFetchType = typeof useFetch

export const useCommonFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()

  // modify options as needed
  return useFetch(path, {
    baseURL: config.public.baseURL,
    headers: {
      Authorization: `Bearer ${config.public.token}`
    },
    ...options
  })
}
