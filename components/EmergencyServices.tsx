import React, { FC, useMemo } from "react"
import { Text } from "react-native-paper"
import { EmergencyService as T } from "@/data/models"
import { useLocationData } from "@/data/locationDataProvider"
import geolib from "geolib"

interface Props {
  data: T[]
}

export const EmergencyServices: FC<Props> = ({ data }) => {
  const loc = useLocationData()
  const shortestDist = useMemo(() => {
    data.reduce(
      (curr, es) => Math.min(curr, geolib.getDistance(es.pos, loc)),
      Infinity,
    )
  }, [data, loc])
  return data.length > 0 ? (
    <Text>
      {data[0].pos.latitude} {data[0].pos.longitude} {loc.latitude}
    </Text>
  ) : (
    <></>
  )
}
