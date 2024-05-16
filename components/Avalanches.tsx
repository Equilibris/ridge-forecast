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
      return "AT RISK"
    case "severe":
      return "DIE"
    case "suicide":
      return "DIE :("
  }
}

export const Avalanches: FC<Props> = ({ data }) => {
  const { beacon } = useUserData()
  return (
    <Center>
      <Text variant="titleMedium">Avalanches</Text>
      <Center style={{ padding: "5px 12px 5px 10px" }}>
        <Text variant="displayMedium" style={{ fontWeight: "bold", padding: 5 }}>{selectAvalancheText(data)}</Text>
        <Text variant="labelMedium" style={{ paddingBottom: 4 }}>Beacon {beacon ? "on" : "off"}</Text>
      </Center>
    </Center>
  )
}
