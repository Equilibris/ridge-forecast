import React, { FC, useCallback } from "react"
import styled from "@emotion/native"
import { Icon, Text } from "react-native-paper"
import { AvalancheSafety as T } from "@/data/models"
import { Center } from "./Center"
import { Pad } from "./Pad"
import { useUserData } from "@/data/userDataProvider"

interface Props {
  data: T
}

const selectAvalancheText = (data: T) => {
  switch (data) {
    case "safe":
      return "SAFE"
    case "moderate":
      return "RISK"
    case "severe":
      return "HIGH"
    case "suicide":
      return "EXT"
  }
}
export const Avalanches: FC<Props> = ({ data }) => {
  const { beacon } = useUserData()
  return (
    <Center>
      <Text variant="titleMedium">Avalanches</Text>
      <Center
        // @ts-expect-error This is wrongly typed as padding can be a 4-tuple
        style={{
          padding: "5px 12px 5px 10px",
        }}
      >
        <Text variant="displayMedium" style={{ padding: 3, fontWeight: "bold" }}>{selectAvalancheText(data)}</Text>
        <Text variant="labelMedium" style={{ paddingBottom: 8 }}>Beacon {beacon ? "on" : "off"}</Text>
      </Center>
    </Center>
  )
}
