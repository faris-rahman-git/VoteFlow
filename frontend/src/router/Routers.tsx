import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Poll from "../pages/Poll";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/poll/:id" element={<Poll />} />
    </Routes>
  );
}

export default Routers;
