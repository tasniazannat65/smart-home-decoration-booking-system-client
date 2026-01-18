import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../../Shared/Loading/Loading";
import Container from "../../Shared/Container/Container";
import Heading from "../../Shared/Heading/Heading";
import { FaAward, FaCheckCircle, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const ITEMS_PER_SLIDE = 3;


const TopDecorators = () => {
  const axiosSecure = useAxiosSecure();
   const [index, setIndex] = useState(0);


  const { data: decorators = [], isLoading } = useQuery({
    queryKey: ["top-decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/top-decorators");

      return res.data;
    },
  });
 const totalSlides = Math.ceil(decorators.length / ITEMS_PER_SLIDE);
 const visibleDecorators = decorators.slice(
  index * ITEMS_PER_SLIDE,
  index * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE
 )
 const next = ()=> {
  setIndex((prev)=> (prev + 1) % totalSlides);
 }
 const prev = ()=> {
  setIndex((prev)=> (prev - 1 + totalSlides) % totalSlides);
 }

  if (isLoading) {
    return <Loading />;
  }
  return (
   
    <div className="pt-6 md:pt-8 lg:pt-12 overflow-hidden">
      <Container>
        <Heading title="Top Decorators" subtitle="Meet top-rated decorators ready to transform your ideas into reality."
        center
        />
        <div className="relative mt-8">
            <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-lg z-10 transition-all hover:scale-110 hover:shadow-xl"

          >
            <FaChevronLeft className="text-lg"/>

          </button>
          <button 
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2  rounded-full bg-gradient-to-r from-primary to-secondary text-white p-4  shadow-lg z-10 transition-all hover:scale-110 hover:shadow-xl"
          >
            <FaChevronRight className="text-lg"/>

          </button>
          <AnimatePresence mode="wait">
            <motion.div
            key={index}
            initial={{opacity: 0, x: 80}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -80}}
            transition={{duration: 0.45, ease: 'easeInOut'}}
            className="flex flex-col lg:flex-row gap-6 justify-center px-12"
            >
              {
                visibleDecorators.map((decorator)=> (
                  <motion.div
                  key={decorator._id}
                  whileHover={{scale: 1.05}}
                  className="w-full max-w-sm relative group"
                  >
                    <div className="bg-base-100 rounded-xl shadow-xl overflow-hidden border-2 border-base-300 hover:border-primary/50 transition-all duration-300">
                    <div className="relative h-32 bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                      <div className="absolute top-5 -left-5 w-20 h-20 bg-white/10 rounded-full"></div>
                      <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-white/10 rounded-full"></div>
                      <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                        <FaAward className="text-warning text-sm"/>
                        <span className="text-primary text-xs font-bold">Top Rated</span>

                      </div>
                      
                    </div>


                    <div className="flex justify-center -mt-16 px-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                           <div className="relative w-32 h-32 rounded-full bg-base-100 p-2 shadow-xl">
 <img src={decorator.photoURL || ""} alt={decorator.displayName}
                    className="w-full h-full  rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-success rounded-full p-1.5 shadow-lg border-2 border-base-100">
                      <FaCheckCircle className="text-white text-sm"/>

                    </div>

                           </div>
                      </div>

                    </div>

                    <div className="px-6 pt-4 pb-6 space-y-4">
                      <div className="text-center">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors text-accent">{decorator.displayName}</h3>
                  <p className="text-xs text-neutral">Professional Decorator</p>



                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center gap-1.5 bg-gradient-to-r from-warning/20 to-warning/10 px-4 py-2 rounded-full border border-warning/30">
                          <FaStar className="text-warning text-base"/>

                    <span className="text-base font-bold text-accent">  {decorator.rating || 4.8}</span>
                    <span className="text-xs text-neutral">/5.0</span>

                        </div>

                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-base-300 to-transparent">

                      </div>
                      <div>
                        <p className="text-xs font-semibold text-neutral mb-3 text-center">Specialties</p>
                         <div className="flex flex-wrap justify-center gap-2">
                      {(
                        decorator.specialties || ['Wedding', 'Home Decor']
                      ).map((item, i)=> (
                        <span key={i}
                        className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-primary  to-secondary text-white  shadow-md hover:shadow-lg transition-all transform hover:scale-105 rounded-full"

                        >
                          {item}

                        </span>
                      ))}

                    </div>

                      </div>

                    </div>

                    </div>
                    
                   
                    
                   

                  </motion.div>

                ))
              }

            </motion.div>

          </AnimatePresence>
        

        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({length: totalSlides}).map((_, i)=> (
            <button key={i}
            onClick={()=> 
              setIndex(i)
            }
            className={` h-2.5 rounded-full transition-all duration-300 ${
              index === i 
              ? 'bg-gradient-to-r from-primary to-secondary w-8 shadow-md'
              : 'bg-base-300 hover:bg-primary/50 w-2.5'
            }`}
            >

            </button>
          ))}

        </div>
      </Container>

    </div>
  );
};

export default TopDecorators;
