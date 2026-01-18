import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Shared/Loading/Loading";
import Heading from "../../Components/Shared/Heading/Heading";
import Container from "../../Components/Shared/Container/Container";
import BookingButton from "../../Components/Shared/Button/BookingButton/BookingButton";
import { FaCalendarAlt, FaCheckCircle, FaStar, FaTag } from "react-icons/fa";

const ServiceDetails = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const { data: service = {}, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  const {data: reviews=[], isLoading: reviewLoading} = useQuery({
    queryKey: ['reviews', id],
    queryFn: async()=> {
      const res = await axiosSecure.get(`/reviews/service/${id}`);
      return res.data;
    }
  })
  const averageRating = reviews.length > 0 ? (
    reviews.reduce((sum, r)=> sum + r.rating, 0) / reviews.length
  ).toFixed(1) : 0

  if (isLoading) {
    return <Loading />;
  }



  


  return (
 <Container>
  <div className="my-8 md:my-12">
    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-base-100 rounded-xl p-4 md:p-6 shadow-xl border border-base-300">
          <div className="mb-4 overflow-hidden rounded-xl">
            <img src={service.image} alt={service.service_name}
            className="w-full h-[350px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-500"
            />

          </div>
        

        </div>

        <div className="bg-base-100 rounded-xl p-6 md:p-8 shadow-xl border border-base-300">
          <Heading title={service.service_name}/>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-6">

          </div>
          <p className="mt-4 text-neutral text-sm md:text-base leading-relaxed">{service.description}</p>

        </div>

        <div className="bg-base-100 rounded-xl p-6 md:p-8 shadow-lg border border-base-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-accent">Customer reviews</h2>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {
                  [1, 2, 3, 4, 5,].map((star)=> (
                    <FaStar key={star} className={
                      star <= Math.round(averageRating) ? 'text-warning': 'text-neutral'
                    }/>
                  ))
                }

              </div>
              <span className="text-neutral text-sm">
                {averageRating} ({reviews.length} reviews)
              </span>

            </div>

          </div>
          {
            reviewLoading && (
              <p className="text-center text-neutral">Loading reviews...</p>
            )
          }
          {
            !reviewLoading && reviews.length === 0 && (
 <div className="bg-base-200 rounded-lg p-8 text-center border border-base-300">
            <p className="text-neutral italic">
              No reviews available for this service yet. Reviews will appear after customers complete their bookings.
            </p>

          </div>
            )
          }

          <div className="space-y-4">
            {
              reviews.map((review)=> (
                <div
                key={review._id}
                className="border rounded-xl p-4 bg-base-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-primary">
                      {review.userName || 'Verified Client'}
                    </p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((star)=> (
                        <FaStar key={star} className={star <= review.rating ? 'text-warning' : 'text-neutral'}/>
                      ))}

                    </div>

                  </div>
                  <p className="text-neutral text-sm">
                    {review.message}
                  </p>

                </div>
              ))
            }

          </div>

         

        </div>

      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-6 space-y-6">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 shadow-2xl text-white">
            <h3 className="text-lg font-bold mb-6">Service Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <FaTag className="text-white text-lg mt-1 shrink-0"/>
              <div>
                <p className="text-white/80 text-xs mt-1">Category</p>
                <p className="font-semibold">{service.service_category}</p>
              </div>

              </div>

              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <FaCalendarAlt className="text-white text-lg mt-1 shrink-0"/>
              <div>
                <p className="text-white/80 text-xs mt-1">Availability</p>
                <p className="font-semibold">Available on booking</p>
              </div>

              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/80 text-xs mb-2">Starting from</p>
             <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">৳{service.cost}</span>
              <span className="text-white/80 text-sm">{service.unit}</span>

             </div>
              </div>

            </div>

          </div>

          <div className="bg-base-100 rounded-xl p-6 shadow-xl border border-base-300 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FaCheckCircle className="text-success text-xl"/>
              <span className="font-bold text-accent">Verified Service</span>

            </div>
            <p className="text-neutral text-sm">100% satisfaction guaranteed</p>

          </div>
          <div className="bg-base-100 rounded-xl p-6 shadow-xl border border-base-300">
            <BookingButton service={service}/>

          </div>

        </div>

      </div>


    </div>

    <div className="mt-12 bg-base-100 rounded-xl p-6 md:p-8 shadow-xl border border-base-300">
      <h2 className="text-xl md:text-2xl font-bold text-accent mb-2">Related Services</h2>
      <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-6">

      </div>
      <div className="bg-base-200 rounded-xl p-8 text-center border border-base-300">
        <p className="text-neutral">
          Related services based on this category will be displayed here.
        </p>

      </div>

    </div>

  </div>
 </Container>
  );
};

export default ServiceDetails;
