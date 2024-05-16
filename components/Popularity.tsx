import React, { FC } from "react"
import styled from "@emotion/native"
import { Icon, Text } from "react-native-paper"
import { Popularity as T } from "@/data/models"

interface Props {
    value: T
    sz: number
}

const Container = styled.View`
  flex-direction: row;
`
const TopContainer = styled.View``

export const PopularityLite: FC<Props> = ({ value, sz }) => (
    <Container>
        <Icon size={sz} source={value >= 1 ? "account" : "account-outline"} />
        <Icon size={sz} source={value >= 2 ? "account" : "account-outline"} />
        <Icon size={sz} source={value >= 3 ? "account" : "account-outline"} />
    </Container>
)

const textSelector = (v: T) => {
    switch (v) {
        case 0:
            return "Empty"
        case 1:
            return "Quiet"
        case 2:
            return "Average"
        case 3:
            return "Crowded"
    }
}

export const Popularity: FC<Props> = ({ value, sz }) => (
    <TopContainer>
        <Text variant="labelMedium">{textSelector(value)}</Text>
        <PopularityLite value={value} sz={sz} />
    </TopContainer>
)
