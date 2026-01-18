import React from "react";
import Button from "../Shared/Button/Button";
import { useNavigate } from "react-router";
import { FaArrowRight, FaTag } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const {
    image,
    service_name,
    cost,
    service_category,
    unit,
    _id,
  } = service;
  return (
   
   <div className="group bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-base-300 hover:border-primary/30">
    <div className="relative overflow-hidden h-56">
      <img src={image} alt={service_name} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute top-4 right-4">
      <div className="bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <FaTag className="text-white text-xs"/>
          <span className="text-white text-sm font-semibold">{service_category}</span>

        </div>

      </div>

    </div>
    </div>
    
    <div className="p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-bold text-accent group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1">

          {service_name}
        </h2>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold text-primary">৳{cost}</div>
          <div className="text-xs text-neutral font-medium">{unit}</div>

        </div>

      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-base-300 to-transparent">

      </div>
      <button onClick={()=>navigate(`/services/${_id}`)} className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group/btn">

        <span>View Details</span>
        <FaArrowRight className="text-xs transform group-hover/btn:translate-x-1 transition-transform duration-300"/>
      </button>

    </div>

   </div>
  
  );
};

export default ServiceCard;
