import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { Mountain } from "./models"
import { getMountains } from "./database"

const dataCtx = createContext<Mountain[]>([])

export const useData = () => useContext(dataCtx)
export const DataProvider: FC<{ children: any }> = ({ children }) => {
  const [data, setData] = useState<Mountain[]>([])

  useEffect(() => {
    getMountains().then((v) => setData(v))
  }, [])

  return <dataCtx.Provider value={data}>{children}</dataCtx.Provider>
}