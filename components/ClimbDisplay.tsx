import React, { FC } from "react"
import styled, { css } from "@emotion/native"
import { PopularityLite } from "./Popularity"
import { Climb as T } from "@/data/models"
import { Bold } from "./TextVariants"
import { Center } from "./Center"
import { useTheme } from "@emotion/react"
import { ProgressBar, Text, Divider, Icon } from "react-native-paper"

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

const ListContainer = styled.View`
  gap: ${(x) => x.theme.padding(1)};
`

const selectGrip = (value: number) =>
  value < 0.3 ? "Bad" : value < 0.6 ? "Ok" : "Good"

export const ClimbDisplay: FC<{ data: T }> = ({ data }) => (
  <>
    <ListContainer style={{ padding: 20 }}>
      <Horizontal>
        <Grow>
          <Text>
            <Bold>Humidity</Bold>: {data.humidity}
          </Text>
        </Grow>
        <Grow>
          <Text style={{ textAlign: "right" }}>
            <Bold>Last precipitation</Bold>: {data.last_precipitation}h
          </Text>
        </Grow>
      </Horizontal>
      <Text>
        <Bold>Grip</Bold>: {selectGrip(data.grip)}
      </Text>

      <ProgressContainer>
        <ProgressBar
          progress={data.grip}
          color="#fff"
          style={{ marginTop: 8, marginBottom: 10 }}
        />
      </ProgressContainer>

      {/* TODO */}
      <Text>
        <Bold>Recommended gear</Bold>:
      </Text>

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
            <Text
              variant="displayMedium"
              style={{ padding: 3, fontWeight: "bold" }}
            >
              19km
            </Text>
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
            <Text
              variant="displayMedium"
              style={{
                padding: 3,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {data.conditions}
            </Text>
          </Center>
        </Center>
      </Grow>
    </Horizontal>
  </>
)
