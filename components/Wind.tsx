import React, { FC, useCallback } from "react"
import styled from "@emotion/native"
import { TimePanel } from "./TimePanel"
import { Icon, Text } from "react-native-paper"
import { Center } from "./Center"

interface Props {
  data: [number, number][]
}

const Container = styled.View`
  height: ${(x) => x.theme.padding(14)};
  gap: ${(x) => x.theme.padding(1)};
`
const Rotator = styled(Center)`
  height: 30px;
  width: 30px;
`

export const Wind: FC<Props> = ({ data }) => {
  const comp: FC<{ id: number }> = useCallback(
    ({ id }) => (
      <Container>
        <Rotator style={{ transform: `rotate(-${90 + data[id][0]}deg)` }}>
          <Icon size={30} source="arrow-down" />
        </Rotator>

        <Text style={{ textAlign: "center" }}>{`${data[id][1]}m/s`}</Text>
      </Container>
    ),
    [data],
  )

  return <TimePanel RenderChild={comp} title="Wind" />
}
