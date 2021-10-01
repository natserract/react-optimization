import { createContext, useState, createElement, useContext, useRef } from 'react'
import { get } from './utils'

type Context<T> = T | (T | ((a: T) => void))[]
type Dispatch = (...args: any) => void

type CachedData = {
  [u: string]: any
}

const CachedDataCtx = createContext<Context<CachedData> | undefined>(undefined)

export function useCachedData<T>() {
  return useContext(CachedDataCtx) as [T[], Dispatch]
}

export const CacheDataProvider: React.FC = ({ children }) => {
  const cache = useRef<CachedData>({})
  const [data, setData] = useState([])

  const setCachedData = (url: string) => {
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
  }

  const value = [data, setCachedData]

  return createElement(CachedDataCtx.Provider, { value }, children)
}

export const AllContextProvider: React.FC = ({ children }) => createElement(
  CacheDataProvider,
  null,
  children,
)