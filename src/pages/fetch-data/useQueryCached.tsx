import { useEffect } from 'react'
import { useCachedData } from './Store'

export function useQueryCached<T = Record<string, any>>(url: string) {
  const [data, setCachedData] = useCachedData<T>()

  const fetchData = () => setCachedData(url)

  useEffect(fetchData, [fetchData])

  return { data }
}