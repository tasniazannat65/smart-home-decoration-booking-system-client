import React from 'react';

const Card = ({icon, value, label}) => {
    return (
        <div className="group bg-base-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-base-100 hover:border-primary/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl text-primary bg-primary/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-accent">{value}</p>
          <p className="text-sm text-neutral font-medium">{label}</p>
        </div>
      </div>
    </div>
    );
};

export default Card;