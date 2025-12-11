import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Loading from '../../Shared/Loading/Loading';
import Heading from '../../Shared/Heading/Heading';
import { Link } from 'react-router';

const HomeCoverage = () => {
    const [coverageData, setCoverageData] = useState([]);
    const mapRef = useRef(null);
    const position = [23.6850, 90.3563];
    useEffect(()=>{
        fetch('/services_area.json')
        .then(res=> res.json())
        .then(data=> setCoverageData(data))
        .catch(err=> console.error(err))
    },[])
    if(!coverageData.length){
        return <Loading/>
    }

    return (
        <div className='mb-16'>
            <div className='mb-8'>
                <Heading title="Our Service Coverage" subtitle="From weddings to corporate events, see how far our expertise reaches." center/>
            </div>
            <div className=' w-full h-[400px]  overflow-hidden shadow-lg'>
                              <MapContainer
                              center={position}
                               zoom={8}
                                scrollWheelZoom={false}
                                className='h-[400px]'
                                ref={mapRef}
                                >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            {
              coverageData.map((service, i) => 
              service?.locations.slice(0, 1).map((loc, index)=>{
                if(typeof loc.lat === 'number' && typeof loc.lng === 'number'){
                  return (
                    <Marker key={`${service.service_name} - ${i} - ${index}`} position={[loc.lat, loc.lng]}>
                      <Popup>
                        <strong>{service.service_name}</strong> <br />
                        {loc.city}
                      </Popup>
                    </Marker>
                  )
                }
            
              }))
            }
               
              </MapContainer>

                        </div>
                              <Link className='flex items-center justify-center' to='/coverage'><button className='btn bg-primary text-white rounded-md my-5 hover:bg-secondary '>View full Coverage</button></Link>

            
        </div>
    );
};

export default HomeCoverage;



