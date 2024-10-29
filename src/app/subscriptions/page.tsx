"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Thêm dòng này
import { FaHandPointRight } from "react-icons/fa";

import { getRequest, postPaymemtRequest } from "../../../helpers/api-requests";
import Loading from "../loading";

import { Subscription } from "../../../constants/types/subscription.type";

export default function Page() {
  const { data: session } = useSession();
  const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;

  const [subscription, setSubscription] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getRequest("/subscription-plans", { "occasion-name": "Dessert" })
      .then((response) => {
        setSubscription(response);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleChoosePlan = (planId: number) => {
    if (userId && session?.user.accessToken) {
      postPaymemtRequest(
        "/payment/create",
        {
          subscriptionPlanId: planId,
          userId,
          CancelUrl: "https://mealhunt.vercel.app/",
          returnUrl: "https://mealhunt.vercel.app/",
        },
        session.user.accessToken,
      )
        .then((response) => {
          console.log("Subscription successful:", response);

          router.push(response);
        })
        .catch((error) => {
          console.error("Error subscribing:", error);
        });
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-[url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?cs=srgb&dl=pexels-ella-olsson-572949-1640774.jpg&fm=jpg')] bg-cover bg-center font-sans min-h-screen px-5 xl:px-0 py-8 w-full flex justify-center items-center">
      <div className="flex gap-6 items-center overflow-x-auto whitespace-nowrap px-4 py-8">
        {subscription.map((plan) => (
          <div key={plan.id} className="relative flex-shrink-0">
            <div className="max-w-sm xl:w-[384px] p-6 bg-white group h-full rounded-2xl transition-transform ease-in-out duration-300 hover:-translate-y-3 hover:bg-[#0B0641] hover:text-white border border-[#0B0641] shadow-lg">
              <div className="flex flex-col gap-5 items-center text-center">
                <span className="text-3xl font-bold text-black group-hover:text-white">
                  {plan.name}
                </span>
                <span className="text-gray-600 group-hover:text-white text-lg">
                  {plan.description}
                </span>
              </div>
              <div className="mt-4">
                <span className="flex mt-2 text-[#A9A9AA] text-2xl font-semibold">
                  Plan Details
                </span>
                <div className="flex flex-row gap-2.5 items-start mt-6 text-left text-lg">
                  <div className="pt-1 shrink-0 text-black group-hover:text-white">
                    <FaHandPointRight />
                  </div>
                  <span className="text-black group-hover:text-white">
                    Duration: {plan.durationInDays} days
                  </span>
                </div>
                <div className="flex flex-row gap-2.5 items-start mt-2 text-left text-lg">
                  <div className="pt-1 shrink-0 text-black group-hover:text-white">
                    <FaHandPointRight />
                  </div>
                  <span className="text-black group-hover:text-white">
                    Price: {plan.price.toLocaleString()} {plan.currency}
                  </span>
                </div>
              </div>
              <div className="border border-dashed border-[#A9A9AA] tracking-widest my-4" />
              <div className="h-36">
                <div className="bottom-6 left-6 right-6 absolute">
                  <div className="flex justify-center items-baseline">
                    <button
                      onClick={() => handleChoosePlan(plan.id)}
                      className="w-full px-4 py-3 bg-[#FFF5FA] text-[#FF1D89] group-hover:text-white group-hover:bg-[#FF1D89] rounded-xl mt-6 font-semibold text-xl"
                    >
                      Choose {plan.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
