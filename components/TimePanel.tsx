import React, { FC } from "react"
import styled, { css } from "@emotion/native"
import { Text } from "react-native-paper"

export interface CommonProps {
    showTime?: boolean
    pop?: boolean
}
interface Props extends CommonProps {
    title: string
    RenderChild: FC<{ id: number }>
}

const Container = styled.View<{ pop?: boolean }>`
  padding: 16px;
  ${(x) =>
        x.pop
            ? css`
          border-radius: 8px;
          shadow-color: #000;
          shadow-offset: 0px 2px;
          shadow-opacity: 0.25;
          shadow-radius: 3.84px;
          elevation: 5;
        `
            : ""}
`

const Title = styled.Text`
  font-size: ${(x) => x.theme.fonts.headlineLarge.fontSize}px;
  font-weight: ${(x) => x.theme.fonts.headlineLarge.fontWeight};
  color: ${(x) => x.theme.colors.onSurface};
  margin-bottom: 16px;
  margin-left: 16px;
  margin-top: 16px;
  text-align: left;
`
const ChildContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`

const InnerChildContainer = styled.View`
  gap: ${(x) => x.theme.padding(1)};
`

const getNextHours = (count: number): number[] => {
    const currentHour = new Date().getHours()
    return Array.from({ length: count }, (_, i) => (currentHour + i) % 24)
}
const hours = getNextHours(8)

export const TimePanel: FC<Props> = ({ title, RenderChild, showTime, pop }) => {
    return (
        <Container pop={pop}>
            <Title>{title}</Title>
            <ChildContainer>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((x) => (
                    <InnerChildContainer key={x}>
                        <RenderChild id={x} />
                        {showTime ? (
                            <Text
                                style={{ textAlign: "center" }}
                            >{`${hours[x] + 1}:00`}</Text>
                        ) : (
                            <></>
                        )}
                    </InnerChildContainer>
                ))}
            </ChildContainer>
        </Container>
    )
}
