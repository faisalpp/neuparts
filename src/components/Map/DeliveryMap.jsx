'use client'
import React, { useState, useEffect } from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { Loader } from "@googlemaps/js-api-loader"
import MobMapForm from '../MobMapForm'
import MapForm from '../MapForm'
import axios from 'axios'
import { RiLoader4Line } from "react-icons/ri";
// import { GetZipCords } from '../../api/frontEnd'
// import Toast from '../../utils/Toast'

const DeliveryMap = ({ customStyle }) => {
    const [zip, setZip] = useState(78602);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false)

    function geocodeAddress(geocoder, map, key) {
        var address = key; // Replace with your searched location

        geocoder.geocode({ address: address }, function (results, status) {

            if (status === "OK") {
                map.setCenter(results[0].geometry.location);
            }
        });
    }

    const loadMap = async (result, zipZoom) => {
        const loader = new Loader({
            apiKey: process.env.NEXT_GOOGLE_API_KEY, // Replace with your own API key
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
            disableDefaultUI: true
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
        zipZoom ? map.setZoom(zipZoom) : map.setZoom(10)
    };

    const [loader, setLoader] = useState(false)

    const Submit = async () => {
        setLoader(true)
        try{
         const res = await axios.get(`/api/check-zipcode?zip=${zip}`)
         const cords = res.data.cords
         loadMap(cords, res.data.zoom);
         setSuccess(true);
         setError(false);
         setLoader(false)
        }catch(error){
            setSuccess(false);
            setError(true);
            setLoader(false)
        }
    };

    useEffect(() => {
        Submit();
    }, [])
    return (
        <div className={customStyle}>
            <div className={`absolute bottom-20 lg:left-24 ${success ? 'flex' : 'hidden'} items-center z-20 bg-transparent h-52 justify-center w-11/12 lg:ml-5 lg:right-0`} >
                <div className='absolute flex items-center z-20 bottom-20 space-x-2 bg-white shadow-xl px-5 py-2 rounded-lg' >
                    <AiFillCheckCircle className='text-b12' />
                    <p className='font-semibold' >Delivery Available {zip}</p>
                </div>
            </div>

            <div className={`absolute bottom-20 lg:left-24 ${error ? 'flex' : 'hidden'} items-center z-20 bg-transparent h-52 justify-center w-11/12 lg:ml-5 lg:right-0`} >
                <div className='flex justify-center h-fit items-center space-x-2 bg-white shadow-xl px-5 py-2 rounded-lg' >
                    <AiFillCloseCircle className='text-red-500' />
                    <p className='font-semibold' >Delivery Not Available {zip}</p>
                </div>
            </div>

            <MobMapForm zip={zip} setZip={setZip} Submit={Submit} />

            <MapForm zip={zip} setZip={setZip} error={error} success={success} Submit={Submit} loading={loader} />

            {/* Map Section Start */}
            <div className="relative w-full xl:h-[686px] lg:h-[490px] md:h-[300px] h-52 rounded-2xl" >
            {loader && <div className="absolute bg-black/50 flex justify-center items-center h-full rounded-2xl z-20 w-full" >
              <RiLoader4Line className='text-white text-6xl animate-spin' />
             </div>}
             <div id="map" className='w-full xl:h-[686px] lg:h-[490px] md:h-[300px] h-52 rounded-2xl' ></div>
            </div>

        </div >
    )
}

export default DeliveryMap