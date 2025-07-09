import "./App.css";
import { Toaster } from "./components/ui/sonner";
import Router from "./router/Router";

function App() {
  return (
    <>
      <Toaster position="top-center" className="rtl" />
      <Router />
    </>
  );
}

export default App;
