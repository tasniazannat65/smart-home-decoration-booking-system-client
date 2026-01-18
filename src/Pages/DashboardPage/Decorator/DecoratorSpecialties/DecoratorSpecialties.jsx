import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

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
    <div className="bg-base-100 p-6 border-base-300 rounded-xl shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary">My Rating</h3>
        <p className="text-lg font-bold flex items-center gap-1">
          {decoratorRating} <FaStar className="text-orange-400" />
        </p>
      </div>
      <h3 className="text-xl font-bold mb-4 text-primary">My Specialties</h3>
      <div className="grid grid-cols-2 gap-3">
        {all_specialties.map((s) => (
          <label key={s} className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={selected.includes(s)}
              onChange={() => toggleSpecialties(s)}
            />
            {s}
          </label>
        ))}
      </div>
      <button
        onClick={handleSpecialties}
        className="btn bg-primary text-white mt-4 hover:bg-secondary px-10 py-4"
      >
        Save
      </button>
    </div>
  );
};

export default DecoratorSpecialties;
