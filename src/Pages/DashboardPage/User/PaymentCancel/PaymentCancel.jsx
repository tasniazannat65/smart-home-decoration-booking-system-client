import React from "react";
import cancelPayment from "../../../../assets/cancel.json";
import Lottie from "lottie-react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 px-4 rounded-xl shadow-lg">
      <title>Laxius Decor || Payment Cencel</title>
      <div className="w-60 h-60">
        <Lottie animationData={cancelPayment} loop={true} />
      </div>
      <h2 className="text-3xl font-bold text-red-600 mt-5">
        Payment Cancelled
      </h2>
      <p className="text-md text-neutral mt-2 text-center max-w-md">
        Your payment was not completed.It looks like you cancelled the
        transaction. You can try again anytime.
      </p>

      <div className="flex gap-4 mt-6">
        <Link to="/dashboard/my-booking">
          <button className="btn bg-primary   text-white px-6">
            Back to My Booking
          </button>
        </Link>
        <Link to="/services">
          <button className="btn bg-secondary  text-white px-6">
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
