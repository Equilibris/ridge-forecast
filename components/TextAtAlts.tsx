import React, { FC } from "react"
import { LinearGradient } from "expo-linear-gradient"
import styled from "@emotion/native"
import { Text } from "react-native-paper"

const Container = styled.View`
  display: flex;
  flex-direction: row;

  padding: 25px;
`
const TextBlock = styled(Text)`
  font-weight: bold;
`
const Strecher = styled.View`
  justify-content: space-between;
`
const Grad = styled(LinearGradient)`
  width: 10px;
  border-radius: 100px;
`

export interface Props {
  bot: number
  top: number

  height: number
}

export const AltsAtHeights: FC<Props> = ({ bot, top, height }) => {
  return (
    <Container>
      <Strecher style={{ height: height - 50 }}>
        <TextBlock variant="displayLarge" style={{ color: "black" }}>
          {top}°
        </TextBlock>
        <TextBlock variant="displayLarge">{bot}°</TextBlock>
      </Strecher>
      <Grad stlye={{ height: height - 50 }} colors={["#536CAA", "#FFFFFF"]} />
    </Container>
  )
}
