import React, { FC } from "react";
import styled from "@emotion/native";

interface Props {
  title: string;
  RenderChild: FC<{ id: number }>;
}

const Container = styled.View`
  padding: 16px;
  background-color: ${(x) => x.theme.colors.background};
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: { width: 0, height: 2 };
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const Title = styled.Text`
  font-size: ${(x) => x.theme.fonts.headlineLarge.fontSize}px;
  font-weight: ${(x) => x.theme.fonts.headlineLarge.fontWeight};
  color: ${(x) => x.theme.colors.onSurface};
  margin-bottom: 16px;
  margin-left: 16px;
  margin-top: 16px;
  text-align: left;
`;

const ChildContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const TimePanel: FC<Props> = ({ title, RenderChild }) => (
  <Container>
    <Title>{title}</Title>
    <ChildContainer>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((x) => (
        <RenderChild key={x} id={x} />
      ))}
    </ChildContainer>
  </Container>
);
