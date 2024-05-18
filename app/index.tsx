import React, { useCallback, useRef, useState } from "react"

import MapView, { Marker } from "react-native-maps"
import { Icon } from "react-native-paper"
import { View, StyleSheet } from "react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import styled from "@emotion/native"
import { useData } from "@/data/dataProvider"
import { Climb, Mountain, Ski } from "@/data/models"
import { MapModal } from "@/components/MapModal"
import { ThemeProvider } from "@/components/ThemeProvider"
import { useTheme } from "@emotion/react"

const Main = styled.View`
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

  const Sheet = useCallback(() => {
    const theme = useTheme()

    return (
      <BottomSheet
        ref={sheetRef}
        snapPoints={["20%", "65%"]}
        index={-1}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.onBackground }}
      >
        {selected ? <MapModal {...selected} /> : <></>}
      </BottomSheet>
    )
  }, [selected, sheetRef])


  const markerStyles = StyleSheet.create({
    marker: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: 30,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
  });


  const getIconName = (activity: Ski | Climb) => {
    switch (activity.type) {
      case 'ski':
      return 'ski';
      case 'climb':
        return 'terrain';
      default:
        return 'help'
    }
  }

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
              setSelected(v);
              openSheet();
            }}
          >
            <View style={[
                markerStyles.marker,
                { backgroundColor: selected && selected.id === v.id ? '#8B0000' : 'red' }
              ]}>
              <Icon
                source={getIconName(v.data)}
                size={20}
                color={"white"}
              />
            </View>
          </Marker>
          ))}
        </MapView>
      </Main>
      <Sheet />
    </ThemeProvider>
  )
}
