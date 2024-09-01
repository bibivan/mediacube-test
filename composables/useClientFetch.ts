export const useClientFetch = async <T>(path: string, options = {}) => {
  const config = useRuntimeConfig()
  const apiFetch = $fetch.create<T>({
    baseURL: config.public.baseURL,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${config.public.token}`
    }
  })
  return await apiFetch(path, options)
}
