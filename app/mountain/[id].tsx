// Img from
// https://www.freepik.com/free-vector/flat-design-mountain-range-silhouette_45123202.htm#query=mountain&position=0&from_view=keyword&track=sph&uuid=9c6db3aa-764f-43c2-a875-f6d99bf307aa

import React, {
  FC,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
} from "react"

import { useLocalSearchParams, useNavigation } from "expo-router"
import { SafeAreaView, GestureResponderEvent } from "react-native"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Divider } from "react-native-paper"
import { ActivityIndicator } from "react-native-paper"
import { Preciperation } from "@/components/Preciperation"
import { Popularity } from "@/components/Popularity"
import { Avalanches } from "@/components/Avalanches"
import { EmergencyServices } from "@/components/EmergencyServices"
import styled from "@emotion/native"
import Img from "@/assets/mountain"
import { LinearGradient } from "expo-linear-gradient"
import { ActivityDisplay } from "@/components/ActivityDisplay"
import { Center } from "@/components/Center"
import { getMountainById } from "@/data/database"
import { Mountain } from "@/data/models"
import { Pad } from "@/components/Pad"
import { AltsAtHeights } from "@/components/TextAtAlts"
import MapView, { Marker } from "react-native-maps"
import BottomSheet from "@gorhom/bottom-sheet"
import { useTheme } from "@emotion/react"

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
      getMountainById(parseInt(id)).then(async (mnt) => {
        if (mnt !== undefined) {
          console.log(mnt)
          await new Promise((r) => setTimeout(r, 300))
          setMountain(mnt)
          navigation.setOptions({
            title: mnt.name,
          })
        }
      })
  }, [navigation])

  const sheetRef = useRef<BottomSheet>(null)

  const openSheet = useCallback((_: GestureResponderEvent): null => {
    sheetRef.current && sheetRef.current.expand()
    return null
  }, [])

  return (
    <ThemeProvider>
      <SafeAreaView>
        {mountain !== null ? (
          <ScrollContainer>
            <Backdrop />

            <Horizontal>
              <Grow style={{ padding: 10 }}>
                <Popularity value={mountain.popularity} sz={40} />
              </Grow>
              <AltsAtHeights
                bot={mountain.temps[0]}
                top={mountain.temps[1]}
                height={500}
              />
            </Horizontal>

            <Divider horizontalInset />

            <Horizontal style={{ padding: 10 }}>
              <Grow>
                <Avalanches data={mountain.avalancheSafety} />
              </Grow>

              <Divider style={{ width: 1, height: "100%" }} />

              <Grow>
                <EmergencyServices
                  data={mountain.emergency_services}
                  cb={openSheet}
                />
              </Grow>
            </Horizontal>

            <Divider horizontalInset />
            <Grow>
              <Preciperation showTime data={mountain.precipitation} />
            </Grow>

            <Divider horizontalInset />

            <Pad padding="20px 0 0 0">
              <ActivityDisplay data={mountain.data} />
            </Pad>
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

      <BottomSheet
        ref={sheetRef}
        snapPoints={["20%", "85%"]}
        index={-1}
        enablePanDownToClose
      >
        { mountain ?
          <MapView
            style={{ height: "100%", width: "100%" }}
            initialRegion={{
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
              ...(mountain?.pos || { longitude: 0, latitude: 0 }),
            }}
          >
            {mountain.emergency_services.map((v, i) => (
              // TODO: improve data model for emergency services so they can have key/title
              <Marker
                key={i}
                coordinate={v.pos}
                // title={v.name}
                // tappable
                // onPress={() => {
                //   setSelected(v)
                //   openSheet()
                // }}
              />
            ))}
          </MapView>
        : <></>
        }
      </BottomSheet>

    </ThemeProvider>
  )
}
