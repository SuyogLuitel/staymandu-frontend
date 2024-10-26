import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import loading2 from "../../assets/loading2.svg";
import { useVerifyMutation } from "../../hooks/useMutateData";
import toast from "react-hot-toast";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const bookingId = searchParams.get("bookingId");

  const verifyMutation = useVerifyMutation();

  const verifyPayment = () => {
    const postData = {
      success: success,
      bookingId: bookingId,
    };
    verifyMutation.mutateAsync(["post", ``, postData], {
      onSuccess: (response) => {
        toast.success("Hotel booked successfully");
        navigate("/myProfile", { state: { activeNum: 3 } });
      },
      onError: (error) => {
        toast.error("Hotel booking failed");
        navigate("/hotel");
      },
    });
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="h-[60vh] grid mt-20">
      <div className="flex flex-col gap-2">
        <img
          src={loading2}
          alt="loading2"
          className="w-[100px] h-[100px] place-self-center"
        />
        <p className="place-self-center">Your payment is being processed...</p>
        <p className="place-self-center">Thankyou for your patience</p>
      </div>
    </div>
  );
};

export default Verify;
