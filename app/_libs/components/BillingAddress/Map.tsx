"use client";

import { useCallback, useEffect, useState } from "react";
import { Map as MapLibreMap, NavigationControl, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FaSearch } from "react-icons/fa";
import { axiosPrivate } from "../../utils/axios";
import { OlaAddres } from "../../utils/types";
import { api } from "../../utils/routes/api";
import debounce from "lodash.debounce";
import { useToast } from "../../hooks/useToast";
import Spinner from "../Spinner";
import { IoLocationSharp } from "react-icons/io5";

type Props = {
 isEdit: boolean;
 isModalOpen: boolean;
 displayMap: boolean;
 currentLocation: {
  lat: number;
  lng: number;
 } | undefined;
 setCurrentLocation: React.Dispatch<React.SetStateAction<{
  lat: number;
  lng: number;
 } | undefined>>;
 mapAddress: OlaAddres | undefined;
 setMapAddress: React.Dispatch<React.SetStateAction<OlaAddres | undefined>>
 setConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

const marker = new Marker({
 anchor: 'center',
 color: '#222',
});

export default function Map({ isEdit, isModalOpen, displayMap, currentLocation, setCurrentLocation, mapAddress, setMapAddress, setConfirm }: Props) {
 const { toastError } = useToast();
 const [mapReady, setMapReady] = useState(false);
 const [locationPermissionLoading, setLocationPermissionLoading] = useState<boolean>(true);
 const [locationPermission, setLocationPermission] = useState<boolean>(true);
 const [reverseLoading, setReverseLoading] = useState<boolean>(false);
 const [searchLoading, setSearchLoading] = useState<boolean>(false);
 const [searchResult, setSearchResult] = useState<OlaAddres[]>([]);
 const [mapEl, setMapEl] = useState<MapLibreMap | undefined>(undefined);

 const setMarkerHandler = (params: { lat: number, lng: number }) => {
  if (!mapReady) return;
  if (mapEl) {
   marker.setLngLat([params.lng, params.lat]).addTo(mapEl);
   mapEl.flyTo({
    center: [params.lng, params.lat],
    zoom: 16
   })
  }
 };

 const reverseGeocodingHandler = debounce(async (params: { lat: number, lng: number }) => {
  setReverseLoading(true);
  try {
   const response = await axiosPrivate.post(api.map_reverse, {
    lat: params.lat,
    lng: params.lng
   })
   if (response.data.data.length > 0) {
    setMapAddress({
     description: response.data.data[0].formatted_address,
     geometry: {
      location: {
       lat: response.data.data[0].geometry.location.lat,
       lng: response.data.data[0].geometry.location.lng
      }
     }
    })
   }
  } catch (error: any) {
   if (error?.response?.data?.message) {
    toastError(error?.response?.data?.message);
   }
  } finally {
   setReverseLoading(false)
  }
 }, 500);

 const onSearchHandler = debounce(async (key: string) => {
  if (key.length < 3) {
   setSearchResult([]);
   return;
  }
  setSearchLoading(true);
  try {
   const res = await axiosPrivate.post<{ data: OlaAddres[] }>(api.map_autocomplete, { key });
   setSearchResult(res.data.data);
  } catch (error: any) {
   if (error?.response?.data?.message) {
    toastError(error?.response?.data?.message);
   }
  } finally {
   setSearchLoading(false);
  }
 }, 500);

 const checkLocationPermission = useCallback(() => {
  setLocationPermissionLoading(true)
  navigator.geolocation.getCurrentPosition((position) => {
   console.log('isEdit: ',isEdit)
   console.log('displayMap: ',displayMap)
   if(isEdit && displayMap && mapAddress){
     setCurrentLocation({ lat: mapAddress.geometry.location.lat, lng: mapAddress.geometry.location.lng });
     setLocationPermission(true);
     return;
   }
   if(!isEdit && displayMap){
     setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
     reverseGeocodingHandler({ lat: position.coords.latitude, lng: position.coords.longitude });
     setLocationPermission(true);
     return;
   }
  }, (error) => {
   console.log(error)
   setLocationPermission(false);
  })
  setLocationPermissionLoading(false)
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [displayMap, isEdit])

 useEffect(() => {
  if(!isModalOpen) return;
  if(!displayMap) return;
  if (typeof window === 'undefined') return;
  checkLocationPermission();
  return () => {
   setLocationPermissionLoading(false)
  }
  // }, [displayMap])
 }, [displayMap, isModalOpen, checkLocationPermission])

 useEffect(() => {
  if (typeof window === 'undefined') return;
  if (!displayMap) return;
  if (!isModalOpen) return;
  if (!locationPermission) return;
  if (!mapReady) return;

  const map = new MapLibreMap({
   container: "map-container",
   center: currentLocation ? [currentLocation.lng, currentLocation.lat] : [77.6107065, 10.8812476],
   zoom: 16,
   style:
    "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
   transformRequest: (url, resourceType) => {
    // Replace the wrong URL with the correct one
    url = url.replace("app.olamaps.io", "api.olamaps.io");

    // Add the API key to the URL based on existing parameters
    if (url.includes("?")) {
     url = url + "&api_key=" + process.env.NEXT_PUBLIC_OLA_MAP_API_KEY;
    } else {
     url = url + "?api_key=" + process.env.NEXT_PUBLIC_OLA_MAP_API_KEY;
    }
    return { url, resourceType };
   },
  });

  if (currentLocation) {
   marker.setLngLat([currentLocation.lng, currentLocation.lat]).addTo(map);
   map.flyTo({
    center: [currentLocation.lng, currentLocation.lat],
    zoom: 16
   })
  }

  map.on('touchstart', (e) => {
   if (e.lngLats.length > 0) {
    marker.setLngLat([e.lngLats[0].lng, e.lngLats[0].lat]).addTo(map);
    map.flyTo({
     center: [e.lngLats[0].lng, e.lngLats[0].lat],
     zoom: 16
    })
    reverseGeocodingHandler({ lat: e.lngLats[0].lat, lng: e.lngLats[0].lng })
   }
  });

  map.on('click', (e) => {
   marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
   map.flyTo({
    center: [e.lngLat.lng, e.lngLat.lat],
    zoom: 16
   })
   reverseGeocodingHandler({ lat: e.lngLat.lat, lng: e.lngLat.lng })
  });

  map.on("load", () => {
   const nav = new NavigationControl({
    visualizePitch: false,
    showCompass: true,
   });
   map.addControl(nav, "top-left");
  });

  setMapEl(map);

  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [displayMap, isModalOpen, mapReady, locationPermission, currentLocation]);

 return (
  locationPermissionLoading ? <div className="w-full m-auto text-center">
   <Spinner type="default" color="black" />
  </div> :
  <>
   <div className="w-full h-52 mt-2">
    <div
     className="w-full h-full overflow-hidden"
     id="map-container"
     ref={() => setMapReady(true)}
    />
   </div>
   <div className=" flex justify-between items-center w-full px-3 rounded-lg border-[#8c6d52] border-solid border-2 bg-white mt-2">
    <FaSearch />
    <input type="text" onChange={(event) => onSearchHandler(event.target.value)} className={` text-gray-600 text-sm flex-1 px-4 py-4 bg-white focus-within:outline-none focus:outline-none focus-visible:outline-none`} placeholder="Type to search Address..." />
   </div>
   <div className="w-full mt-2 h-60 overflow-hidden overflow-y-auto">
    {
     searchLoading ? 
     <div className="w-full m-auto text-center">
      <Spinner type="default" color="black" />
     </div>
     :
     <>
      {searchResult.length > 0 && searchResult.map((item: any, index: number) => <div key={index} className="w-full p-3 border-b border-gray-200 flex gap-2 cursor-pointer text-gray-600 hover:text-[#8c6d52]" onClick={() => {
        setMapAddress(item)
        setMarkerHandler({
          lat: item.geometry.location.lat,
          lng: item.geometry.location.lng
        })
        setSearchResult([])
       }}>
       <div className="w-auto">
        <IoLocationSharp className="mt-1 text-xl" />
       </div>
       <div className="w-auto">
        <p className="text-sm items-start"> <span>{item.description}</span></p>
       </div>
      </div>)}
     </>
   }
   </div>
   <div className="w-full px-3 py-2 rounded-lg border-[#8c6d52] border-solid border-1 bg-[#8c6d52]">
    {
     reverseLoading ? 
     <div className="w-full m-auto text-center">
      <Spinner type="default" color="white" />
     </div> :
     <>
      <div className="">
        <p className="text-white line-clamp-2">{mapAddress ? mapAddress.description : 'Please select a location'}</p>
      </div>
      {mapAddress && <button className="w-full text-black mt-2 bg-white text-sm text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600 hover:text-white" onClick={() => setConfirm(false)}><IoLocationSharp className="text-xl" /> Confirm Location</button>}
     </>
    }
   </div>
  </>
 );
}