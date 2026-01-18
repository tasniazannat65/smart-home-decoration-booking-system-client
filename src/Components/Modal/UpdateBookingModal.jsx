import React, { Fragment } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const UpdateBookingModal = ({ booking, close, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      location: booking.location,
      date: booking.bookingDate?.split("T")[0],
    },
  });
  const handleUpdate = async (data) => {
    try {
      const res = await axiosSecure.patch(`/bookings/${booking._id}`, data);
      if (res.data.modifiedCount > 0) {
        toast.success("Booking updated successfully!");
        if (refetch) {
          refetch();
        }
        close();
      }
    } catch (error) {
      console.error(error);

      toast.error("Update failed!");
    }
  };

  return (
    <Transition show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <DialogPanel className="w-full max-w-md bg-base-100 rounded-xl p-6 shadow-lg">
              <DialogTitle className="text-lg font-semibold text-primary mb-4">
                Update Booking
              </DialogTitle>
              <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                <div>
                  <label className="font-semibold text-sm">Location</label>
                  <input
                    {...register("location", { required: true })}
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm">Booking Date</label>
                  <input
                    {...register("date", { required: true })}
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="btn bg-primary hover:bg-secondary text-white flex-1"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={close}
                    type="button"
                    className="btn bg-gray-700 hover:bg-gray-500  text-white flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateBookingModal;
