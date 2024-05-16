import React, { FC, useCallback } from "react"
import styled from "@emotion/native"
import { TimePanel } from "./TimePanel"
import { Icon, Text } from "react-native-paper"
import { Precipitation as T, PrecipitationType } from "@/data/models"

interface Props {
  data: T
}

const Container = styled.View`
  height: ${(x) => x.theme.padding(14)};
  gap: ${(x) => x.theme.padding(1)};
`

const OuterIndicator = styled.View`
  flex: 1;
  flex-direction: column-reverse;
`

const Indicator = styled.View`
  background-color: ${(x) => x.theme.colors.primary};
  border-radius: ${(x) => x.theme.roundness}px;
  width: 30px;
`
const OuterIcon = styled.View``

const selectIcon = (x: PrecipitationType) => {
  switch (x) {
    case "rain":
      return "weather-rainy"
    case "snow":
      return "weather-snowy"
    case "clear":
      return "weather-sunny"
  }
}

export const Preciperation: FC<Props> = ({ data }) => {
  const comp: FC<{ id: number }> = useCallback(
    ({ id }) => (
      <Container>
        <OuterIndicator>
          <Indicator style={{ height: 1 + data[id][1] * 50 }} />
        </OuterIndicator>
        <OuterIcon>
          <Icon size={30} source={selectIcon(data[id][0])} />
        </OuterIcon>
        <Text style={{ textAlign: "center" }}>{`${id + 12}h`}</Text>
      </Container>
    ),
    [data],
  )

  return <TimePanel RenderChild={comp} title="Precipitation" />
}
