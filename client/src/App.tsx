import { Route, Routes } from "react-router-dom";
import SideNav from "./components/common/sideNav";
import Home from "./pages/home";
import TodayTask from "./pages/today";
import UpComingTask from "./pages/upComing";
import ImportantTask from "./pages/important";
import CompletedTask from "./pages/completed";
import PagenotFound from "./auth/pagenotFound";
import Weather from "./components/weather";
import Calender from "./components/calender";

function App() {
  return (
    <>
      <div className="flex  w-full md:flex-row flex-col">
        <SideNav />
        <div className="flex w-full justify-between h-screen  md:flex-row flex-col  border ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todays" element={<TodayTask />} />
            <Route path="/upcoming" element={<UpComingTask />} />
            <Route path="/important" element={<ImportantTask />} />
            <Route path="/completed" element={<CompletedTask />} />
            <Route path="*" element={<PagenotFound />} />
          </Routes>
          <div className="grid grid-cols-1  md:w-96 w-full gap-3">
            <Weather />
            <Calender />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
