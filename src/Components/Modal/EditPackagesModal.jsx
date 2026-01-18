import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const EditPackagesModal = ({
  isEditOpen,
  setIsEditOpen,
  editPackage,
  services,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (editPackage) {
      const serviceMap = {};
      editPackage.services.forEach((s) => (serviceMap[s.serviceId] = true));
      reset({
        package_name: editPackage.package_name,
        category: editPackage.category,
        price: editPackage.price,
        services: serviceMap,
      });
    }
  }, [editPackage, reset]);
  const closeModal = () => {
    reset();
    setIsEditOpen(false);
  };
  const handleEditPackage = async (data) => {
    try {
      const selectedServices = Object.entries(data.services || {})
        .filter(([, isChecked]) => isChecked)
        .map(([id]) => {
          const service = services.find((s) => s._id === id);
          return {
            serviceId: id,
            service_name: service?.service_name,
            cost: service?.cost,
          };
        });
      const updateData = {
        package_name: data.package_name,
        category: data.category,
        services: selectedServices,
        price: Number(data.price),
      };
      const res = await axiosSecure.patch(
        `/packages/${editPackage._id}`,
        updateData
      );
      if (res.data.modifiedCount) {
        toast.success("Package updated");
        refetch();
        closeModal();
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  return (
    <Transition appear show={isEditOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40"></div>
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale:95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg rounded-2xl bg-base-100 p-6 shadow-xl">
                <DialogTitle className="text-xl font-bold text-accent mb-4">
                  Update Package
                </DialogTitle>
                <form
                  onSubmit={handleSubmit(handleEditPackage)}
                  className="space-y-4"
                >
                  <div>
                    <label className="label">Package Name</label>
                    <input
                      {...register("package_name")}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Category</label>
                    <select {...register("category")} className="select w-full">
                      <option value="">Select Category</option>
                      <option value="wedding">Wedding</option>
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                      <option value="corporate">Corporate</option>
                      <option value="seminar">Seminar</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2  gap-2 max-h-40 overflow-y-auto border p-2 rounded">
                    {services.map((service) => (
                      <label key={service._id} className="flex gap-2">
                        <input
                          type="checkbox"
                          {...register(`services.${service._id}`)}
                        />
                        {service.service_name}
                      </label>
                    ))}
                  </div>
                  <div>
                    <label className="label">Price (BDT)</label>
                    <input
                      type="number"
                      {...register("price")}
                      className="input w-full"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="submit"
                      className="btn bg-primary text-white hover:bg-secondary"
                    >
                      Update Package
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn bg-gray-600 text-white hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditPackagesModal;
