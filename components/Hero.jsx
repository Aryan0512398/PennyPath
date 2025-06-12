import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <section className="bg-gray-100 flex flex-col items-center overflow-x-hidden">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Set Financial Goals and
            <strong className="text-indigo-600"> Track Progress Easily </strong>
          </h1>

          <p className="mt-4 text-base font-medium text-pretty  sm:text-lg/relaxed">
            Know where your money goes and take charge of it.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <a
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href="/sign-in"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <Image
        className="-mt-7 rounded-xl border-2"
        src={"/dashboard.webp"}
        alt="Dashboard"
        width={1000}
        height={700}
      />
    </section>
  );
}

export default Hero;
Hero;
