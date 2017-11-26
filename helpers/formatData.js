const axios = require('axios');
const config = require('../config');

function getRouteObj(routeIDs, vehicles, stops) {

  const routesMap = new Map();

  vehicles.forEach((vehicle) => {
    const key = vehicle.rid;
    if(routesMap.has(key)) {
      const vehicles = routesMap.get(key).get('vehicles');      
      vehicles.push(vehicle);
    } else {
      const value = new Map();
      value.set('vehicles', [vehicle]);
      routesMap.set(key, value);
    }
  })
  //console.log(routesMap.get('E').get('vehicles')[0]);
  
  stops.forEach((stop) => {
    const route = stop.id;
    const stopsObj = stop.stops.map(makeStopsFromNextBus);
    routesMap.get(route).set('stops', stopsObj);
  });
  //console.log(routesMap.get('E').get('stops')[0]);

  routesArray = Array.from(routesMap);
  //console.log(routesArray);
  return routesArray.map(route => ({
    name: route[0],
    vehicles: route[1].get('vehicles'),
    stops: route[1].get('stops')
  }));

}

function makeStopsFromNextBus(nextbusObject) {
  const { id, title, lat, lon } = nextbusObject;
  return {
    sid: id,
    name: title,
    lat,
    lon,
  };
}

module.exports = getRouteObj;
