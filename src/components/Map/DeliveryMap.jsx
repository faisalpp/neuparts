'use client';
import React, { useState, useEffect } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { Loader } from '@googlemaps/js-api-loader';
import MapForm from '../MapForm';
import axios from 'axios';
import { RiLoader4Line } from 'react-icons/ri';

const DeliveryMap = ({ customStyle }) => {
  const [zip, setZip] = useState(78602);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function geocodeAddress(geocoder, map, key) {
    var address = key; // Replace with your searched location

    geocoder.geocode({ address: address }, function (results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
      }
    });
  }
  const loadMap = async (result, zipZoom) => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY, // Replace with your own API key
      version: 'weekly', // or specify a specific version (e.g., 'weekly', 'weekly.next', 'beta')
    });

    await loader.load();

    // Mid of cords
    var dataArray = result;
    var midIndex = Math.floor(dataArray.length / 2);
    var midObject = dataArray[midIndex];

    var midLat = midObject.lat;
    var midLng = midObject.lng;

    // Initialize the map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: midLat, lng: midLng },
      zoom: 10,
      disableDefaultUI: true,
    });

    // Define the polygon coordinates
    const polygonCoordinates = result;

    // Create the polygon
    const polygon = new window.google.maps.Polygon({
      paths: polygonCoordinates,
      strokeColor: '#4e41da',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#4e41da80',
      fillOpacity: 0.35,
    });
    var geocoder = new window.google.maps.Geocoder();
    // const keys = Object.keys(zip);
    // const key = keys[0];
    geocodeAddress(geocoder, map, zip.toString());
    // Set the polygon on the map
    polygon.setMap(map);
    zipZoom ? map.setZoom(zipZoom) : map.setZoom(10);
  };

  const [loader, setLoader] = useState(false);

  const Submit = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`/api/check-zipcode?zip=${zip}`);
      const cords = res.data.cords;
      loadMap(cords, res.data.zoom);
      setSuccess(true);
      setError(false);
      setLoader(false);
    } catch (error) {
      setSuccess(false);
      setError(true);
      setLoader(false);
    }
  };

  useEffect(() => {
    Submit();
  }, []);
  return (
    <div className={customStyle}>
      <div className={`absolute bottom-20 lg:left-24 ${success ? 'flex' : 'hidden'} z-20 h-52 w-11/12 items-center justify-center bg-transparent lg:right-0 lg:ml-6`}>
        <div className="absolute bottom-20 z-20 flex items-center space-x-2 rounded-lg bg-white px-5 py-2 shadow-xl">
          <AiFillCheckCircle className="text-b12" />
          <p className="font-semibold">Delivery Available {zip}</p>
        </div>
      </div>

      <div className={`absolute bottom-20 lg:left-24 ${error ? 'flex' : 'hidden'} z-20 h-52 w-11/12 items-center justify-center bg-transparent lg:right-0 lg:ml-5`}>
        <div className="flex h-fit items-center justify-center space-x-2 rounded-lg bg-white px-5 py-2 shadow-xl">
          <AiFillCloseCircle className="text-red-500" />
          <p className="font-semibold">Delivery Not Available {zip}</p>
        </div>
      </div>

      <MapForm zip={zip} setZip={setZip} error={error} success={success} Submit={Submit} loading={loader} />

      {/* Map Section Start */}
      <div id="map_cc" className="relative col-span-2 h-[500px] w-full rounded-2xl lg:h-[490px]  xl:h-[686px] 3xl:col-span-3 maxlg:-my-52">
        {loader && (
          <div className="absolute z-20 flex h-full w-full items-center justify-center rounded-2xl bg-black/50">
            <RiLoader4Line className="animate-spin text-6xl text-white" />
          </div>
        )}
        <div id="map" className="h-[500px] w-full rounded-2xl lg:h-[490px] xl:h-[686px] maxlg:rounded-t-none"></div>
      </div>
    </div>
  );
};

export default DeliveryMap;
