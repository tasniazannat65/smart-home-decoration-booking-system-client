import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Shared/Loading/Loading";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import Heading from "../../Components/Shared/Heading/Heading";
import Container from "../../Components/Shared/Container/Container";
import noDataFound from "../../assets/no_data_found.json";
import Lottie from "lottie-react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router";

const Services = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [debouncedMin, setDebouncedMin] = useState(min);
  const [debouncedMax, setDebouncedMax] = useState(max);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedMin(min), 500);
    return () => clearTimeout(handler);
  }, [min]);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedMax(max), 500);
    return () => clearTimeout(handler);
  }, [max]);

  const { data: servicesData = [], isLoading } = useQuery({
    queryKey: [
      "services",
      debouncedSearch,
      category,
      debouncedMin,
      debouncedMax,
      page
    ],
    queryFn: async () => {
      const res = await axiosSecure.get("/services", {
        params: {
          search: debouncedSearch,
          category,
          min: debouncedMin ? Number(debouncedMin) : 0,
          max: debouncedMax ? Number(debouncedMax) : 9999999,
          page, 
          limit,
        },
      });
      return res.data;
    },
  });
  const services = servicesData.services || [];
  const totalPages = servicesData.totalPages || 1;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <title>Laxius Decor || Services</title>
      <Container>
        <Link
          to="/"
          className="text-primary flex items-center mt-5 hover:text-secondary"
        >
          <FaArrowLeft />
          Back to home
        </Link>
        <div className="max-w-4xl mx-auto py-4 md:py-6 lg:py-8">
          <Heading
            title="Our Decoration Services"
            subtitle="  Explore our premium decoration services designed for weddings,
          birthdays, home events, offices and corporate programs."
            center
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* searched by service name */}
          <input
            type="text"
            placeholder="Search Services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-base-100 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md w-full "
          />
          {/* filtered by service category */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-base-100  focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md w-full "
          >
            <option value="">All Categories</option>
            <option value="wedding">Wedding</option>
            <option value="home">Home</option>
            <option value="office">Office</option>
            <option value="corporate">Corporate</option>
            <option value="seminar">Seminar</option>
          </select>
          {/* filtered by min  cost*/}
          <input
            type="number"
            placeholder="Min Price"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-base-100 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md w-full "
          />
          {/* filtered by max cost*/}

          <input
            type="number"
            placeholder="Max Price"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-base-100 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none transition duration-300 ease-in-out hover:shadow-md w-full "
          />
        </div>
        {services.length === 0 ? (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-base-100">
            <div className="w-80 md:w-96 lg:w-96">
              <Lottie animationData={noDataFound} loop={true}></Lottie>
            </div>
            <h2 className="text-3xl font-bold mt-4 text-accent">
              Oops! No Result Found.
            </h2>
            <p className="text-neutral mt-2 text-center max-w-md">
              Try adjusting your search or filters to find what you’re looking
              for.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setDebouncedSearch("");
                setCategory("");
                setMin("");
                setDebouncedMin("");
                setMax("");
                setDebouncedMax("");
              }}
              className="btn bg-primary hover:bg-secondary text-white mt-4 rounded-md font-semibold"
            >
              Show all services
            </button>
          </div>
        ) : (
          <>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
           <div className="flex gap-2 justify-center mt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn btn-sm bg-primary/20"
              >
                Prev
              </button>
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num + 1)}
                  className={`btn btn=sm ${
                    page === num + 1 ? "btn-primary" : ""
                  }`}
                >
                  {num + 1}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="btn btn-sm bg-primary/20"
              >
                Next
              </button>
            </div>
          
          </>
         

           
        )}
      </Container>
    </div>
  );
};

export default Services;
