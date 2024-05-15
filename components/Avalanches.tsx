import React, { FC, useCallback } from "react"
import styled from "@emotion/native"
import { Icon, Text } from "react-native-paper"
import { AvalancheSafety as T } from "@/data/models"

interface Props {
  data: T
}

export const Avalanches: FC<Props> = ({ data }) => {
  return <Text>{ data }</Text>
}
