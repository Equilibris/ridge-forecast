import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { Pos } from "./models"

const locationDataCtx = createContext<Pos>({ longitude: 0, latitude: 0 });

export const useLocationData = () => useContext(locationDataCtx)
export const LocationDataProvider: FC<{ children: any }> = ({ children }) => {
  const [data, setData] = useState<Pos>({ longitude: 0, latitude: 0 })

  useEffect(() => {
    setData({ latitude: 45.1075720, longitude: 5.7756820 });
  }, [])

  return <locationDataCtx.Provider value={data}>{children}</locationDataCtx.Provider>
}