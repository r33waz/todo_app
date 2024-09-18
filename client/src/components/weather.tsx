import { useEffect, useState } from "react";
import { weatherInfo } from "../rtk/weatherThunk/weatherThunk";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import TodayDate from "../components/common/date";

function Weather() {
  const [city, setCity] = useState<string>("");
  const dispatch = useAppDispatch();
  const { data, weatherLoading } = useAppSelector((state) => state.weather);

  useEffect(() => {
    dispatch(weatherInfo({ city }));
  }, [dispatch, city]);

  // URL for weather icon
  const iconUrl = data?.weather[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : "";

  //debouncing the city
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setCity(e.target.value);
    }, 1000);
  };

  return (
    <div className=" w-full h-fit p-4 bg-[#f2a900] text-white rounded-lg shadow-lg ">
      <div className="flex justify-between items-center flex-col">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-lg p-2 bg-white text-black"
          onChange={handleSearch}
        />
        <TodayDate />
      </div>
      {weatherLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="3" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScale0"
                fill="freeze"
                attributeName="r"
                begin="0;svgSpinners6DotsScale2.end-0.5s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="16.5" cy="4.21" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScale1"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScale0.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="7.5" cy="4.21" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScale2"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScale4.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="19.79" cy="7.5" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScale3"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScale1.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="4.21" cy="7.5" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScale4"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScale6.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="21" cy="12" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScale5"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScale3.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="3" cy="12" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScale6"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScale8.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="19.79" cy="16.5" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScale7"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScale5.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="4.21" cy="16.5" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScale8"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScalea.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="16.5" cy="19.79" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScale9"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScale7.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="7.5" cy="19.79" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScalea"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScaleb.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
            <circle cx="12" cy="21" r="0" fill="currentColor">
              <animate
                id="svgSpinners6DotsScaleb"
                fill="freeze"
                attributeName="r"
                begin="svgSpinners6DotsScale9.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines="0,1,0,1;.53,0,.61,.73"
                keyTimes="0;.2;1"
                values="0;2;0"
              />
            </circle>
          </svg>
        </div>
      ) : (
        <>
          <div className="flex items-center flex-col ">
            {/* Display the weather icon */}
            {iconUrl ? (
              <img
                src={iconUrl}
                alt={"Weather icon"}
                className="w-40 h-24 object-cover"
              />
            ) : (
              <div  className="w-40 h-24 flex justify-center items-center">
               Invalid City Search
              </div>
            )}
            <div className="text-3xl font-bold flex items-center justify-start w-full gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="text-purple-600"
              >
                <path
                  fill="currentColor"
                  d="M13 17.26V6a4 4 0 0 0-8 0v11.26a7 7 0 1 0 8 0M9 4a2 2 0 0 1 2 2v7H7V6a2 2 0 0 1 2-2m0 24a5 5 0 0 1-2.5-9.33l.5-.28V15h4v3.39l.5.28A5 5 0 0 1 9 28M20 4h10v2H20zm0 6h7v2h-7zm0 6h10v2H20zm0 6h7v2h-7z"
                />
              </svg>
              {data?.main?.temp ?? "--"}°C
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-purple-600"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="ml-2">
                {data?.name}, {data?.sys?.country}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-purple-600"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
              <p className="ml-2">{data?.weather[0]?.main || "--"}</p>
            </div>
            <div className="flex items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-purple-600"
              >
                <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
                <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
              </svg>
              <p className="ml-2">{data?.wind?.speed || "--"} km/hr</p>
            </div>
            <div className="flex items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-purple-600"
              >
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
              </svg>
              <p className="ml-2">{data?.main?.humidity || "--"}%</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
