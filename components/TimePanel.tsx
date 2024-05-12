import React, { FC } from "react"
import styled from "@emotion/native"

interface Props {
  title: string
  RenderChild: Component<{ id: number }>
}

const Container = styled.View``
const Title = styled.Text`
  font-size: ${(x) => x.theme.fonts.headlineLarge.fontSize};
  font-weight: ${(x) => x.theme.fonts.headlineLarge.fontWeight};
  color: ${(x) => x.theme.colors.onSurface};
`

const ChildContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`

export const TimePanel: FC<Props> = ({ title, RenderChild }) => (
  <Container>
    <Title>{title}</Title>
    <ChildContainer>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((x) => (
        <RenderChild key={x} id={x} />
      ))}
    </ChildContainer>
  </Container>
)
