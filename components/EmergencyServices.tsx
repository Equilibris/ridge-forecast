import React, { FC, useMemo, useRef, useCallback } from "react"
import { TouchableHighlight } from "react-native"
import { Icon, Text } from "react-native-paper"
import { EmergencyService as T } from "@/data/models"
import { useUserData } from "@/data/userDataProvider"
import { getDistance } from "geolib"
import { Center } from "./Center"
import { Pad } from "./Pad"
import { useTheme } from "@emotion/react"
import styled from "@emotion/native"

interface Props {
  data: T[],
  cb: Function
}

const Horizontal = styled.View`
  flex-direction: row;
`

const ButtonIcon = styled.View`
  background: ${(p) => p.theme.colors.primary};
  padding: 10px;
  border-radius: 100px;
`

export const EmergencyServices: FC<Props> = ({ data, cb }) => {
  const { loc } = useUserData()
  const shortestDist = useMemo(() => {
    return data.reduce(
      (curr, es) => Math.min(curr, getDistance(es.pos, loc)),
      Infinity,
    )
  }, [data, loc])

  return data.length > 0 ? (
    <Center>
      <Text variant="titleMedium">Emergency Services</Text>
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
          <TouchableHighlight onPress={cb}>
            <ButtonIcon>
              <Icon size={30} source="map-outline" />
            </ButtonIcon>
          </TouchableHighlight>
          <Center>
            <Text
              variant="labelMedium"
              style={{ fontWeight: "bold", padding: 3 }}
            >
              View
            </Text>
          </Center>
        </Pad>
      </Horizontal>
    </Center>
  ) : (
    <></>
  )
}
