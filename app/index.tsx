import React, { useCallback, useMemo, useRef, useState, useLayoutEffect } from "react"

import { useNavigation } from "expo-router"
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
import { Autocomplete } from "@/components/Autocomplete"

const Main = styled.View`
  background-color: papayawhip;

  height: 100%;
  width: 100%;
  position: relative;
`

const StyledMarker = styled.View<{ selected: boolean }>`
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #fff;

  background-color: ${(x) => (x.selected ? x.theme.colors.primary : "red")};
`

const markerStyles = StyleSheet.create({
    marker: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
})

const Container = styled.View`
  margin: ${(x) => x.theme.padding(1)};
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
`

export default function Index() {
    const mountains = useData()
    const navigation = useNavigation()

    const mapRef = useRef<MapView>(null)
    const sheetRef = useRef<BottomSheet>(null)
    const [selected, setSelected] = useState<Mountain | false>(false)

    const openSheet = useCallback(
        () => sheetRef.current && sheetRef.current.expand(),
        [],
    )

    useLayoutEffect(() => {
      navigation.setOptions({
        title: "RidgeForecast"
      });
    }, [navigation])

    const Sheet = useCallback(() => {
        const theme = useTheme()

        return (
            <BottomSheet
                ref={sheetRef}
                snapPoints={["20%", "95%", "65%"]}
                index={-1}
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: theme.colors.background }}
                handleIndicatorStyle={{ backgroundColor: theme.colors.onBackground }}
            >
                {selected ? <MapModal {...selected} /> : <></>}
            </BottomSheet>
        )
    }, [selected, sheetRef])

    const getIconName = (activity: Ski | Climb) => {
        switch (activity.type) {
            case "ski":
                return "ski"
            case "climb":
                return "terrain"
            default:
                return "help"
        }
    }

    return (
        <ThemeProvider>
            <Main>
                <Autocomplete
                    onSelect={(opt) => {
                        if (!mapRef.current) return
                        console.log(opt.x.pos)
                        mapRef.current.animateToRegion({
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                            ...opt.x.pos,
                        })
                    }}
                    opts={useMemo(
                        () => mountains.map((x) => ({ key: x.name, id: x.id, x })),
                        [mountains],
                    )}
                />
                <MapView
                    ref={(map) => (mapRef.current = map)}
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
                        >
                            <StyledMarker
                                selected={selected && selected.id === v.id}
                                style={[markerStyles.marker]}
                            >
                                <Icon source={getIconName(v.data)} size={20} color={"white"} />
                            </StyledMarker>
                        </Marker>
                    ))}
                </MapView>
            </Main>
            <Sheet />
        </ThemeProvider>
    )
}
