import React, { FC, useMemo } from "react"
import { Icon, Text } from "react-native-paper"
import { EmergencyService as T } from "@/data/models"
import { useUserData } from "@/data/userDataProvider"
import { getDistance } from "geolib"
import { Center } from "./Center"
import { Pad } from "./Pad"
import styled from "@emotion/native"

interface Props {
  data: T[]
}

const Horizontal = styled.View`
  flex-direction: row;
`

export const EmergencyServices: FC<Props> = ({ data }) => {
  const { loc } = useUserData()
  const shortestDist = useMemo(() => {
    return data.reduce(
      (curr, es) => Math.min(curr, getDistance(es.pos, loc)),
      Infinity,
    )
  }, [data, loc])
  return data.length > 0 ? (
    <Center>
      <Text variant="titleMedium">
        Emergency Services
      </Text>
      <Horizontal>
        <Pad padding="5px 12px 5px 10px">
          <Icon size={50} source="map-marker-distance" />
          <Center>
            <Pad padding="3px 0px 3px 0px">
              <Text variant="labelMedium">{shortestDist}m</Text>
            </Pad>
          </Center>
        </Pad>
        <Pad padding="5px 12px 5px 10px">
          <Icon size={50} source="map-outline" />
        </Pad>
      </Horizontal>
    </Center>
  ) : (
    <></>
  )
}
