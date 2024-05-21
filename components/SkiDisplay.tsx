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

const Container = styled.View``

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
    <Circ style={{ backgroundColor: difficulty, flex: 1 }} />
    <Bold style={{ flex: 4 }} numberOfLines={1}>{name}</Bold>
    <Container style={{ flex: 5 }}>
      <ProgressBar progress={snowQuality} color="#fff" />
    </Container>
    <Container style={{ flex: 3 }}>
      <PopularityLite value={popularity} sz={25} />
    </Container>
  </PisteContainer>
)

const ListContainer = styled.View`
  gap: ${(x) => x.theme.padding(1)};
`

export const SkiDisplay: FC<{ pistes: T[] }> = ({ pistes }) => (
  <>
    <ListContainer style={{ padding: 20 }}>
      <Container style={{ flexDirection: "row", gap: 6 }}>
        <Text variant="labelMedium" style={{ flex: 1 }}>Diff</Text>
        <Text variant="labelMedium" style={{ flex: 4 }}>Name</Text>
        <Text variant="labelMedium" style={{ flex: 5 }}>Snow Quality</Text>
        <Text variant="labelMedium" style={{ flex: 3 }}>Popularity</Text>
      </Container>
      {pistes.map((v, idx) => (
        <Piste key={idx} {...v} />
      ))}
    </ListContainer>
  </>
)
