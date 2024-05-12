import { Mountain } from "@/data/models"
import React from "react"
import { View } from "react-native"
import { Bold } from "./TextVariants"
import { BottomSheetView } from "@gorhom/bottom-sheet"
import styled from "@emotion/native"
import { Button } from "./Button"
import { Link } from "expo-router"

const BottomSheet = styled(BottomSheetView)`
  padding: ${(x) => x.theme.padding(2)};
  padding-bottom: ${(x) => x.theme.padding(4)};
  gap: ${(x) => x.theme.padding(1)};
  flex-grow: 1;
`
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  font-size: ${(x) => x.theme.fonts.headlineLarge.fontSize};
`

export const MapModal = (m: Mountain) => {
  return (
    <BottomSheet>
      <TitleContainer>
        <Bold>{m.name}</Bold>
        <Bold>{m.data.type}</Bold>
      </TitleContainer>

      <View style={{ flexGrow: 1 }} />

      <Bold style={{ textAlign: "center" }}> Good conditions for X</Bold>
      <Link href={`/mountain/${m.id}`}>
        <Button mode="contained">
          <Bold>Hello</Bold>
        </Button>
      </Link>
    </BottomSheet>
  )
}
