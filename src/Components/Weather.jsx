import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsWind,
  BsWater,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import Search from "../assets/search.png";

const Weather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Addis Ababa");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    if (input.value === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = "";

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ef878f199e06252d1ab429adc4483e3b`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white text-center" />
        </div>
      </div>
    );
  }

  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  return (
    <section className="relative top-[5%] place-self-center p-[20px] sm:p-[40px] rounded-xl main flex flex-col items-center shadow-400">
      {errorMsg && (
        <div className="text-[#ff208c] my-4 text-2xl uppercase font-bold">{`${errorMsg.response.data.message}`}</div>
      )}

      <div
        className={`${
          animate ? "animate-shake" : "animate-none"
        } flex items-center gap-[12px]`}
      >
        <input
          onChange={(e) => handleInput(e)}
          type="text"
          placeholder="Enter a city name..."
          className="h-[35px] sm:h-[50px] border-none outline-none rounded-[40px] pl-[25px] text-base sm:text-xl bg-[#eefffc] text-[#626262]"
        />
        <img
          onClick={(e) => handleSubmit(e)}
          src={Search}
          className="w-[35px] p-[8px] sm:w-[52px] sm:p-[15px] rounded-full cursor-pointer bg-[#ebfffc]"
        />
      </div>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center my-10">
          <ImSpinner8 className="text-5xl animate-spin text-white " />
        </div>
      ) : (
        <div className="items-center flex flex-col">
          <div className="text-7xl text-white mt-8 mb-0">{icon}</div>
          <div className="flex items-center gap-5">
            <p className="text-white text-[40px] sm:text-[80px]">
              {parseInt(data.main.temp)}
            </p>
            <TbTemperatureCelsius className="text-white text-5xl" />
          </div>
          <p className="text-white text-[22px] sm:text-[40px]">
            {data.name}, {data.sys.country}
          </p>
          <div className="w-full mt-10 text-white flex justify-between items-center gap-6">
            <div className="flex items-center gap-2 sm:gap-4 sm:text-xl">
              <BsWater className="text-3xl" />
              <div>
                <p>{data.main.humidity}%</p>
                <p className="block text-base">Humidity</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 sm:text-xl">
              <BsWind className="text-3xl" />
              <div>
                <p>{data.wind.speed} KM/HR</p>
                <p className="block text-base">Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Weather;
