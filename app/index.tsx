import React, { useCallback, useRef, useState } from "react"

import MapView, { Marker } from "react-native-maps"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import styled from "@emotion/native"
import { Text } from "react-native"
import { useData } from "@/data/dataProvider"
import { Mountain } from "@/data/models"
import { MapModal } from "@/components/MapModal"
import { ThemeProvider } from "@/components/ThemeProvider"

const Main = styled.SafeAreaView`
  background-color: papayawhip;

  height: 100%;
  width: 100%;
`

export default function Index() {
  const mountains = useData()

  const sheetRef = useRef<BottomSheet>(null)
  const [selected, setSelected] = useState<Mountain | null>(null)

  const openSheet = useCallback(
    () => sheetRef.current && sheetRef.current.expand(),
    [],
  )

  return (
    <ThemeProvider>
      <Main>
        <MapView
          style={{ height: "100%", width: "100%" }}
          initialRegion={{
            latitude: 45.1842259,
            longitude: 5.6743406,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          {mountains.map((v) => (
            <Marker
              key={v.id}
              coordinate={{
                latitude: v.pos.latitude,
                longitude: v.pos.longitude,
              }}
              title={v.name}
              tappable
              onPress={() => {
                setSelected(v)
                openSheet()
              }}
            />
          ))}
        </MapView>
      </Main>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["20%", "80%"]}
        index={-1}
        enablePanDownToClose
      >
        {selected ? <MapModal {...selected} /> : <></>}
      </BottomSheet>
    </ThemeProvider>
  )
}
