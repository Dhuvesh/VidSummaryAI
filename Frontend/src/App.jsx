import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";

import UploadMeeting from "./components/Upload";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/upload" element={<UploadMeeting/>} />
          {/* <Route path="/summary" element={<SummaryPage />} /> */}
        </Routes>
    
    
    </BrowserRouter>
  )
}