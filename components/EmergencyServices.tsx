import React, { FC, useCallback, useMemo } from "react"
import styled from "@emotion/native"
import { Icon, Text } from "react-native-paper"
import { EmergencyService as T } from "@/data/models"
import { useLocationData } from "@/data/locationDataProvider"
import geolib from "geolib";

interface Props {
  data: T
}

export const EmergencyServices: FC<Props> = ({ data }) => {
  const loc = useLocationData();
  const shortestDist = useMemo(() => {
    data.reduce((curr, longLat) => Math.min(curr, geolib.getDistance(longLat, loc)), Infinity);
  }, [ data ]);
  return <Text>{ data[0].latitude } { data[0].longitude } { useLocationData().latitude }</Text>
}
