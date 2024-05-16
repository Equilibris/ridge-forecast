import React, { FC } from "react"
import styled from "@emotion/native"
import { PopularityLite } from "./Popularity"
import { Piste as T } from "@/data/models"
import { Bold } from "./TextVariants"
import { useTheme } from "@emotion/react"
import { ProgressBar, Text } from "react-native-paper"

const PisteContainer = styled.View`
  flex-direction: row;

  align-items: center;

  gap: ${(x) => x.theme.padding(1)};
`

const Circ = styled.View`
  border-radius: 100px;
  height: 25px;
  width: 25px;
`
const ProgressContainer = styled.View`
  flex: 5;
`

const Piste: FC<T> = ({ snowQuality, popularity, difficulty, name }) => (
  <PisteContainer>
    <Circ style={{ backgroundColor: difficulty }} />
    <Bold style={{ flex: 1, textAlign: "center" }}>{name}</Bold>
    <ProgressContainer>
      <ProgressBar progress={snowQuality} color="#fff" />
    </ProgressContainer>
    <PopularityLite value={popularity} sz={25} />
  </PisteContainer>
)

const ListContainer = styled.View`
  gap: ${(x) => x.theme.padding(1)};
`

export const SkiDisplay: FC<{ pistes: T[] }> = ({ pistes }) => (
  <>
    <Text>Skiing</Text>
    <ListContainer style={{ padding: 20 }}>
      {pistes.map((v, idx) => (
        <Piste key={idx} {...v} />
      ))}
    </ListContainer>
  </>
)
