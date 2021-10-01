import { useEffect } from 'react'
import { useCachedDataCtx } from './Store'

export function useCachedFetch(url: string) {
  const [data, setCachedData] = useCachedDataCtx()

  const fetchData = () => {
    setCachedData(url)
  }

  useEffect(fetchData, [fetchData])

  return { data }
}