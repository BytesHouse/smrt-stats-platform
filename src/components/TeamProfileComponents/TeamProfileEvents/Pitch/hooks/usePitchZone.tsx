import {
  useCallback,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
import { userActions } from 'store/user/userSlice';
import { pitchActions } from 'store/pitch/pitchSlice';
import type { TZones } from '../helpers/getZones';
import {
  getZones,
  getCustomZones,
  drawZones,
} from '../helpers';
import { TMarker } from '../types';
import { drawCustomRectangle } from '../helpers/drawCustomRectangle';

export type TSelectedZone = Record<number, Record<number, TMarker>| null>

export const usePitchZone = ({
  height,
  markers,
  pitchMultiplier,
  showDraw,
  width,
}: TZones) => {
  const dispatch = useDispatch()
  // @ts-ignore
  const pitchSettings = useSelector((state) => state.user.userProfile.pitchSettings)
  // @ts-ignore
  const selectedMarkersPitch = useSelector((state) => state.pitch.selectedMarkers)

  const handleClickZone = (selectedMarkers: TSelectedZone) => {
    dispatch(pitchActions.setSelectedMarkers(selectedMarkers))
  }

  const currentStep = pitchSettings?.selectedZone?.value > 14
    ? Number(pitchSettings?.selectedZone?.value) / 3
    : pitchSettings?.selectedZone?.value

  const getAllZones = useCallback(() => {
    if ([12, 14].includes(pitchSettings?.selectedZone?.value)) {
      return getCustomZones({
        height,
        markers,
        pitchMultiplier,
        quantity: pitchSettings?.selectedZone?.value,
        step: currentStep,
        width,
      })
    }
    return getZones({
      height,
      markers,
      pitchMultiplier,
      quantity: pitchSettings?.selectedZone?.value,
      step: currentStep,
      width,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, pitchSettings?.wholePitch, pitchSettings?.selectedZone]);

  useEffect(() => {
    const { circles, zones } = getAllZones()
    if (circles.length
        && zones.length
        && pitchSettings?.wholePitch) {
      drawZones({
        circles,
        handleClickZone,
        selectedMarkers: selectedMarkersPitch,
        zones,
      })
    } else {
      d3.select('.zones_markers').remove();
    }

    return () => {
      d3.select('.zones_markers').remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    markers,
    pitchSettings?.wholePitch,
    pitchSettings?.selectedZone,
  ])

  useEffect(() => {
    setTimeout(() => {
      dispatch(userActions.setPitchSettings({
        ...pitchSettings,
        showDraw,
      }))
    }, 300)

    drawCustomRectangle({
      handleClickZone,
      height,
      markers,
      pitchMultiplier,
      showDraw,
      width,
    })

    if (!showDraw) {
      const zone = d3
        .select('#pitch-events')
        .select('svg')
        .select('g')
        .select('g')
        .attr('class', 'brush');
      zone.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, showDraw]);
}
