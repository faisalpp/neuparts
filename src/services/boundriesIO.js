import axios from 'axios'

export const ZipTransform = async (zipCode) => {
   const options = {
    method: 'GET',
    url: 'https://vanitysoft-boundaries-io-v1.p.rapidapi.com/rest/v1/public/boundary/zipcode',
    params: {
      zipcode: zipCode,
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_NEU_ZIPCODE_API_KEY,
      'X-RapidAPI-Host': process.env.NEXT_NEU_ZIPCODE_API_HOST
    }
  };
    let data;
    let raw;
    let country;
    let city;
    let state;
    try {
     const response = await axios.request(options);
     country = response.data.features[0].properties.country;
     city = response.data.features[0].properties.city;
     state = response.data.features[0].properties.state;
     data = response.data.features[0].geometry.coordinates[0]
     raw = response.data.features[0].geometry.coordinates[0]
    } catch (error) {
      return false;
    }

    // Swap the elements in each inner array
    for (const innerArray of data) {
        [innerArray[0], innerArray[1]] = [innerArray[1], innerArray[0]];
    }
    // Initialize an empty array for transformed data
    const transformedData = [];

    // Transform the data into the desired format
    for (const pair of data) {
      transformedData.push({ "lat": pair[0], "lng": pair[1] });
    }
   
   // The transformed data is now stored in the transformedData array
   return {cords:transformedData,raw:raw,country:country,city:city,state:state,};

}
