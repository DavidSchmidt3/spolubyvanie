"use client";
import { cn } from "@/lib/utils";
import {
  DEFAULT_ZOOM,
  FALLBACK_LATITUDE,
  FALLBACK_LONGITUDE,
} from "@/lib/utils/map";
import { type Theme } from "@/lib/utils/theme/config";
import { useTheme } from "next-themes";
import type { Map as OLMap } from "ol";
import { apply } from "ol-mapbox-style";
import LayerGroup from "ol/layer/Group";
import { fromLonLat } from "ol/proj";
import { useRef } from "react";
import { Map, View } from "react-openlayers";
import "react-openlayers/dist/index.css";

const DEFAULT_LONGITUDE =
  process.env.NEXT_PUBLIC_MAP_DEFAULT_LONGITUDE ?? FALLBACK_LONGITUDE;
const DEFAULT_LATITUDE =
  process.env.NEXT_PUBLIC_MAP_DEFAULT_LATITUDE ?? FALLBACK_LATITUDE;

export default function MapComponent() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = (theme === "system" ? systemTheme : theme) as Theme;

  const layerGroupRef = useRef<LayerGroup | null>(null);

  const center = fromLonLat([
    Number(DEFAULT_LONGITUDE),
    Number(DEFAULT_LATITUDE),
  ]);

  const initializeMap = (map: OLMap | null) => {
    if (map) {
      console.log("map", map);
      const openfreemap = new LayerGroup();
      layerGroupRef.current = openfreemap;

      map.addLayer(openfreemap);

      void apply(openfreemap, "https://tiles.openfreemap.org/styles/bright");
    }
  };

  return (
    <div
      className={cn({
        "map-dark-filter": currentTheme === "dark",
        "h-dvh": true,
      })}
    >
      <Map ref={initializeMap}>
        <View center={center} zoom={DEFAULT_ZOOM} />
      </Map>
    </div>
  );
}
