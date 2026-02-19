"use client"
import OnboardingCard from "@/components/onboarding/OnboardingCard";
import React, { useState } from "react";

const Task = () => {

  const [close, setClose]= useState(false)

    const closeOnboarding = () => {
      console.log("🎯 Finished onboarding flow");
      setClose(true)
  };
  return (
    <div>
    {close ? "this is the tasks page": (  <OnboardingCard closeModal={close} setCloseModal={closeOnboarding} />)}
    </div>
  );
};

export default Task;
