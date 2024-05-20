import React, { FC } from "react"
import styled, { css } from "@emotion/native"
import { PopularityLite } from "./Popularity"
import { Climb as T } from "@/data/models"
import { Bold } from "./TextVariants"
import { Center } from "./Center"
import { useTheme } from "@emotion/react"
import { ProgressBar, Text, Divider, Icon } from "react-native-paper"

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

const Horizontal = styled.View`
  flex-direction: row;
`
const Grow = styled.View`
  flex: 1;
  flex-direction: column-reverse;
`

const Piste: FC<T> = ({ snowQuality, popularity, difficulty, name }) => (
  <PisteContainer>
    <Circ style={{ backgroundColor: difficulty }} />
    <Bold style={{ flex: 1, minWidth: 60 }} numberOfLines={1}>{name}</Bold>
    <ProgressContainer>
      <ProgressBar progress={snowQuality} color="#fff" />
    </ProgressContainer>
    <PopularityLite value={popularity} sz={25} />
  </PisteContainer>
)

const ListContainer = styled.View`
  gap: ${(x) => x.theme.padding(1)};
`

const selectGrip = (value) =>
  0 <= value < 0.3 ? "Bad" : 0.3 <= value < 0.6 ? "Ok" : "Good";

export const ClimbDisplay: FC<{ data: T }> = ({ data }) => (
  <>
    <ListContainer style={{ padding: 20 }}>
      <Horizontal>
        <Grow>
          <Text><Bold>Humidity</Bold>: {data.humidity}</Text>
        </Grow>
        <Grow>
          <Text style={{ textAlign: "right" }}><Bold>Last precipitation</Bold>: {data.last_precipitation}h</Text>
        </Grow>
      </Horizontal>
      <Text><Bold>Grip</Bold>: {selectGrip(data.grip)}</Text>

      <ProgressContainer>
        <ProgressBar progress={data.grip} color="#fff" style={{ marginTop: 8, marginBottom: 10 }} />
      </ProgressContainer>

      {/* TODO */}
      <Text><Bold>Recommended gear</Bold>:</Text>

      <Text>Foos</Text>
    </ListContainer>

    <Horizontal>
      <Grow>
        <Center>
          <Text variant="titleMedium">Visibility</Text>
          <Center
            // @ts-expect-error This is wrongly typed as padding can be a 4-tuple
            style={{
              padding: "5px 12px 5px 10px",
            }}
          >
            <Text variant="displayMedium" style={{ padding: 3, fontWeight: "bold" }}>19km</Text>
          </Center>
        </Center>
      </Grow>

      <Grow>
        <Center>
          <Text variant="titleMedium">Conditions</Text>
          <Center
            // @ts-expect-error This is wrongly typed as padding can be a 4-tuple
            style={{
              padding: "5px 12px 5px 10px",
            }}
          >
            <Text variant="displayMedium" style={{ padding: 3, fontWeight: "bold", textTransform: "capitalize" }}>{data.conditions}</Text>
          </Center>
        </Center>
      </Grow>
    </Horizontal>
  </>
)
