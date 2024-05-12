// Img from
// https://www.freepik.com/free-vector/flat-design-mountain-range-silhouette_45123202.htm#query=mountain&position=0&from_view=keyword&track=sph&uuid=9c6db3aa-764f-43c2-a875-f6d99bf307aa

import React, { useLayoutEffect } from "react"

import { useLocalSearchParams, useNavigation } from "expo-router"
import { SafeAreaView, ScrollView } from "react-native"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Divider, Text } from "react-native-paper"
import { Wind } from "@/components/Wind"
import { Preciperation } from "@/components/Preciperation"
import { Popularity } from "@/components/Popularity"
import { SkiDisplay } from "@/components/SkiView"
import { Card, ProgressBar } from "react-native-paper"
import styled from "@emotion/native"
import Img from "@/assets/mountain"
import { LinearGradient } from "expo-linear-gradient"
import { Bold } from "@/components/TextVariants"

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

const Backdrop = () => (
  <BackdropContainer>
    <ImgClipper>
      <ImgTransformer>
        <Img />
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
`

export default function Page() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Hello world`,
    })
  }, [navigation])

  return (
    <ThemeProvider>
      <SafeAreaView>
        <ScrollContainer>
          <Backdrop />
          <Horizontal style={{ height: 500 }} />
          <Horizontal>
            <Grow>
              <Popularity value={2} sz={20} />
            </Grow>
            <Grow>
              <Text>hello </Text>
            </Grow>
          </Horizontal>
          <Divider horizontalInset />
          <Grow>
            <Preciperation
              data={[
                ["clear", 0.0],
                ["rain", 0.1],
                ["snow", 0.2],
                ["snow", 0.2],
                ["snow", 0.2],
                ["snow", 0.2],
                ["snow", 1],
                ["snow", 0.2],
                ["snow", 0.2],
                ["snow", 0.2],
                ["snow", 0.2],
              ]}
            />
          </Grow>
          <Divider horizontalInset />
          <Bold>Skiing</Bold>
          <Divider horizontalInset />

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
        </ScrollContainer>
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
