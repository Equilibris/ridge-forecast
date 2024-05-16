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
      <Center
        // @ts-expect-error This is wrongly typed as padding can be a 4-tuple
        style={{
          padding: "5px 12px 5px 10px",
        }}
      >
        <Text variant="displayMedium">{selectAvalancheText(data)}</Text>
        <Text variant="labelMedium">Beacon {beacon ? "on" : "off"}</Text>
      </Center>
    </Center>
  )
}
