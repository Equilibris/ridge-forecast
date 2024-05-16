// Img from
// https://www.freepik.com/free-vector/flat-design-mountain-range-silhouette_45123202.htm#query=mountain&position=0&from_view=keyword&track=sph&uuid=9c6db3aa-764f-43c2-a875-f6d99bf307aa

import React, { FC, useLayoutEffect, useState } from "react"

import { useLocalSearchParams, useNavigation } from "expo-router"
import { SafeAreaView, ScrollView } from "react-native"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Divider, Text } from "react-native-paper"
import { ActivityIndicator } from "react-native-paper"
import { Wind } from "@/components/Wind"
import { Preciperation } from "@/components/Preciperation"
import { Popularity } from "@/components/Popularity"
import { SkiDisplay } from "@/components/SkiView"
import { Avalanches } from "@/components/Avalanches"
import { EmergencyServices } from "@/components/EmergencyServices"
import { Card, ProgressBar } from "react-native-paper"
import styled from "@emotion/native"
import Img from "@/assets/mountain"
import { LinearGradient } from "expo-linear-gradient"
import { Bold } from "@/components/TextVariants"
import { Center } from "@/components/Center"
import { getMountainById } from "@/data/database"
import { Mountain } from "@/data/models"
import { Pad } from "@/components/Pad"
import { AltsAtHeights } from "@/components/TextAtAlts"

const BackdropContainer = styled.View`
  position: absolute;

  left: 0;
  right: 0;
  top: 0;
`
const ImgClipper = styled.View`
  width: 100%;
  height: 500px;

  overflow: hidden;
`
const ImgTransformer = styled.View`
  transform: translate(-300px, 00px) scale(1.3);
`

const ImgDimmer = styled.View`
  opacity: 0.5;
`

const Backdrop: FC<{ dimmed?: boolean }> = ({ dimmed }) => (
  <BackdropContainer>
    <ImgClipper>
      <ImgTransformer>
        {dimmed ? (
          <ImgDimmer>
            <Img />
          </ImgDimmer>
        ) : (
          <Img />
        )}
      </ImgTransformer>
    </ImgClipper>

    <LinearGradient
      style={{ height: 1000, width: "100%" }}
      colors={["#212B44", "#536CAA"]}
    />
  </BackdropContainer>
)

const ScrollContainer = styled.ScrollView`
  position: relative;
`

const Horizontal = styled.View`
  flex-direction: row;
`
const Grow = styled.View`
  flex: 1;
  flex-direction: column-reverse;
`

export default function Page() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const [mountain, setMountain] = useState<null | Mountain>(null)

  useLayoutEffect(() => {
    if (typeof id === "string")
      getMountainById(id).then(async (mnt) => {
        await new Promise((r) => setTimeout(r, 250))
        setMountain(mnt)
        navigation.setOptions({
          title: mnt.name,
        })
      })
  }, [navigation])

  return (
    <ThemeProvider>
      <SafeAreaView>
        {mountain !== null ? (
          <ScrollContainer>
            <Backdrop />

            <Horizontal>
              <Grow>
                <Popularity value={mountain.popularity} sz={40} />
              </Grow>
              <AltsAtHeights bot={10} top={20} height={500} />
            </Horizontal>

            <Divider horizontalInset />

            <Horizontal style={{ padding: 10 }}>
              <Grow>
                <Avalanches data={mountain.avalancheSafety} />
              </Grow>

              <Divider style={{ width: 1, height: "100%" }} />

              <Grow>
                <EmergencyServices data={mountain.emergency_services} />
              </Grow>
            </Horizontal>

            <Divider horizontalInset />
            <Grow>
              <Preciperation showTime data={mountain.precipitation} />
            </Grow>
            <Divider horizontalInset />
            <Bold>Skiing</Bold>
            <Divider horizontalInset />

            {mountain.data.type === "ski" ? (
              <SkiDisplay pistes={mountain.data.pistes} />
            ) : (
              <></>
            )}
          </ScrollContainer>
        ) : (
          <Center
            style={{
              height: "100%",
            }}
          >
            <Backdrop dimmed={true} />
            <ActivityIndicator size="large" animating={true} />
          </Center>
        )}
      </SafeAreaView>
    </ThemeProvider>
  )
}

/*
 *
          <ScrollView>
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
              ]}
            />
            <SkiDisplay
              pistes={[
                {
                  name: "hello",
                  difficulty: "red",
                  popularity: 1,
                  snowQuality: 0.5,
                },
                {
                  name: "world",
                  difficulty: "blue",
                  popularity: 2,
                  snowQuality: 0.6,
                },
              ]}
            />
            */
