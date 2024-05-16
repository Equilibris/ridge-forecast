import React, { FC, useMemo } from "react"
import { Icon, Text } from "react-native-paper"
import { EmergencyService as T } from "@/data/models"
import { useLocationData } from "@/data/locationDataProvider"
import { getDistance } from "geolib"
import { Center } from "./Center"
import styled from "@emotion/native"

interface Props {
  data: T[]
}

const Horizontal = styled.View`
  flex-direction: row;
`

const Grow = styled.View`
  flex: 1;
`

export const EmergencyServices: FC<Props> = ({ data }) => {
  const loc = useLocationData()
  const shortestDist = useMemo(() => {
    return data.reduce(
      (curr, es) => Math.min(curr, getDistance(es.pos, loc)),
      Infinity,
    )
  }, [data, loc])
  return data.length > 0 ? (
    <>
      <Text variant="titleMedium">
        Emergency Services
      </Text>
      <Horizontal>
        <Grow>
          <Text variant="displayMedium">{shortestDist}m</Text>
        </Grow>
        <Grow>
          <Icon size={50} source="map-outline" />
        </Grow>
      </Horizontal>
    </>
  ) : (
    <></>
  )
}
