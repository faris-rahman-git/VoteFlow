import { BrowserRouter } from "react-router-dom";
import Routers from "./router/Routers";
import { Toaster } from "sonner";
import type { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import Loader from "./components/features/common/Loader";

function App() {
  const loadingStatus = useSelector((state: RootState) => state.loader.status);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      {loadingStatus && <Loader />}
      <Routers />
    </BrowserRouter>
  );
}

export default App;
