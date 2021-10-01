import { createContext, useState, createElement, useContext, useRef, useMemo, useCallback } from 'react'
import { get } from './utils'

type Context<T> = T | (T | ((a: T) => void))[]

type CachedData = {
  [u: string]: any
}

const CachedDataCtx = createContext<Context<CachedData> | undefined>(undefined)

export const useCachedDataCtx = () => useContext(CachedDataCtx) as [any[], Function]

export const CacheDataProvider: React.FC = ({ children }) => {
  const cache = useRef<CachedData>({})
  const [data, setData] = useState([])

  const setCachedData = useCallback((url: string) => {
    let cachedData = cache.current[url]

    const onFetch = async () => {
      const responses = await get(url)
      cache.current[url] = responses

      setData(cachedData)
    }

    if (!cache.current[url]) {
      onFetch()
    } else {
      setData(cachedData)
    }
  }, [])

  const value = [data, setCachedData]
  return createElement(CachedDataCtx.Provider, { value }, children)

  // prevents unnecessary renders
  // const value = useMemo(() => [data, setCachedData], [data, setCachedData])
  // return createElement(CachedDataCtx.Provider, { value }, children)
}

export const AllContextProvider: React.FC = ({ children }) => createElement(
  CacheDataProvider,
  null,
  children,
)