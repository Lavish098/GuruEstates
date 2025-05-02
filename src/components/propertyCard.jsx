import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Bed,
  Bath,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import ActivityCard from "./ActivityCard";
import { assets } from "../assets/assets";

const propertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <Card className="relative overflow-hidden w-[300px] h-[97%] 2xl:w-[400px]">
      <div className="relative h-60 bg-muted flex items-center justify-center">
        {property.images && property.images.length ? (
          <img
            src={`${property.images[0]}`}
            alt=""
            className="w-full h-[100%]"
          />
        ) : (
          <div></div>
        )}

        <ActivityCard />

        <div className="absolute bottom-[-10px] left-[20px] px-3 py-2 bg-emerald-200 rounded-xl inline-flex justify-center items-center gap-2">
          <h2 className="justify-start text-slate-800 text-[10px] font-normal font-['Inter'] leading-none">
            House for Sale
          </h2>
        </div>

        <div className="w-28 h-7  absolute bottom-[10px] right-[10px] bg-gradient-to-b from-emerald-600/80 to-emerald-600/70 rounded-lg shadow-[0px_0px_4.432432651519775px_0px_rgba(71,84,103,0.25)] outline outline-1 outline-offset-[-1.11px] outline-white/40">
          <div className="left-[10.66px] top-0 absolute flex justify-center items-center gap-2.5">
            <div className="w-[100px] h-6 flex items-center justify-center text-gray-50 text-xs font-semibold font-['Inter'] leading-snug">
              Chat with us
            </div>
            <img src={assets.whatsapp} alt="" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold truncate text-[20px] mb-2">
          {property.title}
        </h3>
        <p className="text-[18px] mb-2 text-muted-foreground truncate flex justify-start items-stretch">
          <img src={assets.marker} alt="" />
          {property.address}
        </p>
        <div className="flex flex-col justify-between mb-4">
          <p className="text-xl mb-3 font-semibold text-green-600">
            &#8358;{property.price.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex w-6 h-6 text-[17px] mr-3">
              <img src={assets.bed} alt="" className="mr-2" />
              {property.bedrooms}
            </span>
            <span>•</span>
            <span className="flex w-6 h-6 text-[17px] mr-3">
              <img src={assets.bath} alt="" className="mr-2" />

              {property.bathrooms}
            </span>
            <span>•</span>
            <span className="flex w-6 h-6 text-[17px] mr-3">
              <img src={assets.kitchen} alt="" className="mr-2" />

              {property.squareFeet}
            </span>
          </div>
        </div>

        <hr />
        <div className="py-5 mt-3 w-[100px] text-[20px] flex justify-center items-center ">
          <button
            className="justify-end py-3 px-7 bg-gray-100 rounded-xl"
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/property/${property._id}`)}
          >
            View
          </button>
        </div>
      </div>
    </Card>
  );
};

export default propertyCard;
