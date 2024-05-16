import { Mountain } from "@/data/models"
import React from "react"
import { router } from "expo-router"
import { View } from "react-native"
import { Bold } from "./TextVariants"
import { BottomSheetView } from "@gorhom/bottom-sheet"
import styled from "@emotion/native"
import { Button } from "./Button"
import { Wind } from "./Wind"
import { Preciperation } from "./Preciperation"
import { Divider } from "react-native-paper"

const BottomSheet = styled(BottomSheetView)`
  padding: ${(x) => x.theme.padding(2)};
  padding-bottom: ${(x) => x.theme.padding(4)};
  gap: ${(x) => x.theme.padding(1)};
  flex-grow: 1;
`
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const ButtonText = styled(Bold)`
  color: ${(x) => x.theme.colors.onPrimary};
`

const mapper: Record<"ski" | "climb", string> = {
  ski: "Skiing",
  climb: "Climbing",
}

export const MapModal = (m: Mountain) => {
  return (
    <BottomSheet>
      <TitleContainer>
        <Bold variant="headlineLarge">{m.name}</Bold>
        <Bold variant="headlineLarge">{mapper[m.data.type]}</Bold>
      </TitleContainer>

      <Wind
        data={[
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ]}
      />
      <Preciperation
        data={[
          ["snow", 0],
          ["snow", 0],
          ["snow", 0],
          ["snow", 0],
          ["snow", 0],
          ["snow", 0],
          ["snow", 0],
          ["snow", 0],
          ["snow", 0],
          ["snow", 0],
          ["snow", 0],
        ]}
      />

      <View style={{ flexGrow: 1 }} />

      <Bold style={{ textAlign: "center" }}>
        Good conditions for {mapper[m.data.type]}
      </Bold>
      <Button
        mode="contained"
        onPress={() =>
          router.push({ pathname: `/mountain/[id]`, params: { id: m.id } })
        }
      >
        <ButtonText>View mountain</ButtonText>
      </Button>
      <View style={{ height: 100 }} />
    </BottomSheet>
  )
}
