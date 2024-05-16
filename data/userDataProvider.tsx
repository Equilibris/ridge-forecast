import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { Pos } from "./models"

interface UserData {
  loc: Pos
  beacon: boolean
}

const userDataCtx = createContext<UserData>({
  loc: { longitude: 0, latitude: 0 },
  beacon: false,
})

export const useUserData = () => useContext(userDataCtx)
export const UserDataProvider: FC<{ children: any }> = ({ children }) => {
  const [data, setData] = useState<UserData>({
    loc: { longitude: 0, latitude: 0 },
    beacon: false,
  })

  useEffect(() => {
    setData({
      loc: { latitude: 45.107572, longitude: 5.772502 },
      beacon: true,
    })
  }, [])

  return <userDataCtx.Provider value={data}>{children}</userDataCtx.Provider>
}
