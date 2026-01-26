import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaCheckCircle, FaStar } from "react-icons/fa";

const all_specialties = [
  "Wedding",
  "Home Decor",
  "Office",
  "Corporate",
  "Seminar",
];

const DecoratorSpecialties = ({ current = [], rating = 0 }) => {
  const axiosSecure = useAxiosSecure();
  const [selected, setSelected] = useState(current);
  const [decoratorRating, setDecoratorRating] = useState(rating);
  const toggleSpecialties = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  useEffect(() => {
    setDecoratorRating(rating);
  }, [rating]);
  const handleSpecialties = async () => {
    try {
      await axiosSecure.patch("/decorator/update-specialties", {
        specialties: selected,
      });
      toast.success("Specialties updated");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };
  return (
    <div className="bg-base-100 rounded-xl shadow-lg p-8 border border-base-100">
      {/* Rating Section */}
      <div className="mb-8 pb-6 border-b border-base-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-neutral uppercase tracking-wide mb-2">
              My Rating
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-accent">
                {decoratorRating.toFixed(1)}
              </span>
              <FaStar className="text-amber-400 text-2xl" />
            </div>
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <FaStar className="text-white text-3xl" />
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <div>
        <h3 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          My Specialties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {all_specialties.map((s) => (
            <label
              key={s}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selected.includes(s)
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-base-200 bg-base-100 hover:border-primary/30 hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-lg border-2 border-base-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  checked={selected.includes(s)}
                  onChange={() => toggleSpecialties(s)}
                />
                {selected.includes(s) && (
                  <FaCheckCircle className="absolute -top-1 -right-1 text-primary text-xs" />
                )}
              </div>
              <span className={`font-medium ${selected.includes(s) ? "text-primary" : "text-neutral"}`}>
                {s}
              </span>
            </label>
          ))}
        </div>
        <button
          onClick={handleSpecialties}
          className="w-full py-3  bg-primary hover:bg-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default DecoratorSpecialties;
