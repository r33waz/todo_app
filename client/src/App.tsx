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
import Login from "./auth/login";
import Signup from "./auth/signup";

const routesWithSideNav = [
  { path: "/home", element: <Home /> },
  { path: "/todays", element: <TodayTask /> },
  { path: "/upcoming", element: <UpComingTask /> },
  { path: "/important", element: <ImportantTask /> },
  { path: "/completed", element: <CompletedTask /> },
];

function App() {
  return (
    <Routes>
      {/* Routes that do not include SideNav, Weather, and Calendar */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Routes that include SideNav, Weather, and Calendar */}
      {routesWithSideNav.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <div className="flex w-full md:flex-row flex-col">
              <SideNav />
              <div className="flex w-full justify-between h-screen md:flex-row flex-col border">
                <div className="flex-grow p-4">{element}</div>
                <div className="grid grid-cols-1 md:w-80 w-full gap-3 ">
                  <Weather />
                  <Calender />
                </div>
              </div>
            </div>
          }
        />
      ))}
      
      {/* Catch-all route */}
      <Route path="*" element={<PagenotFound />} />
    </Routes>
  );
}

export default App;
