import React, { FC } from "react"
import styled from "@emotion/native"
import { Activity } from "@/data/models"
import { Center } from "./Center"
import { Divider, ProgressBar, Text } from "react-native-paper"
import { SkiDisplay } from "./SkiDisplay"
import { ClimbDisplay } from "./ClimbDisplay"

const selectDisplay = (data: Activity) => {
  console.log(data)
  switch (data.type) {
    case "ski":
      return <SkiDisplay pistes={data.pistes} />
    case "climb":
      return <ClimbDisplay />
  }
}

export const ActivityDisplay: FC<{ data: Activity }> = ({ data }) => (
  <>
    <Center>
      <Text
        variant="titleLarge"
        style={{ fontWeight: "bold", textTransform: "capitalize" }}
      >
        {data.type}
      </Text>
    </Center>

    {selectDisplay(data)}
  </>
)
