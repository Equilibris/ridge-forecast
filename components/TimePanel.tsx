import React, { Component, FC } from "react"
import { Text } from "react-native-paper"
import { Center } from "./Center"
import styled from "@emotion/native"

interface Props {
  title: string
  RenderChild: FC<{ id: number }>
}

const Container = styled.View``
// const Title = styled.Text`
//   font-size: ${(x) => x.theme.fonts.headlineLarge.fontSize};
//   font-weight: ${(x) => x.theme.fonts.headlineLarge.fontWeight};
//   color: ${(x) => x.theme.colors.onSurface};
// `

const ChildContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`

export const TimePanel: FC<Props> = ({ title, RenderChild }) => (
  <Container>
    <Text variant="titleMedium">{title}</Text>
    <ChildContainer>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((x) => (
        <RenderChild key={x} id={x} />
      ))}
    </ChildContainer>
  </Container>
)
