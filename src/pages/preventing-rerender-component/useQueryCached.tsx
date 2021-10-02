import { useEffect } from 'react'
import { useCachedData } from './Store'

export function useQueryCached(url: string) {
  const [data, setCachedData] = useCachedData()

  const fetchData = () => {
    setCachedData(url)
  }

  useEffect(fetchData, [fetchData])

  return { data }
}