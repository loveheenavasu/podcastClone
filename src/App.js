import "./App.css";
import PodcastDetailPage from "./components/podcast/chlidren/PodcastDetailPage";
import Podcast from "./components/podcast/Podcast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Podcast />} />

          <Route path="/podcast/:id" element={<PodcastDetailPage />} />
        </Routes>
      </Router>
    </>
    // <Box sx={{ background: "hsl(0deg 0% 16.47%)", color: "#fff" }}>
    //   <Podcast />
    // </Box>
  );
}

export default App;
