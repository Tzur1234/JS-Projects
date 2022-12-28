// Make the request API

//ES6:

class Weather {
  constructor(longitude, latitude) {
    this.X_RapidAPI_Key = "16fba29dacmsh665f57b5eda66e5p14a5adjsn8e77dbcf0661";
    this.X_RapidAPI_Host = "dark-sky.p.rapidapi.com";
    // קוו רוחב
    this.latitude = latitude;
    //קוו אורך
    this.longitude = longitude;
  }

  async getForcast(lon, lat) {
    // const url = 'https://dark-sky.p.rapidapi.com/34.5,31?units=auto&lang=en';

    const url = `https://dark-sky.p.rapidapi.com/${lat},${lon}?units=auto&lang=en`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": this.X_RapidAPI_Key,
        "X-RapidAPI-Host": this.X_RapidAPI_Host,
      },
    };

    const respons = await fetch(url, options);
    const data = await respons.json();

    console.log(data);

    // return object
    return { currently: data.currently, timezone: data.timezone };
  }
}
