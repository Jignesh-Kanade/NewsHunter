// import NewsHunter from "./components/NewsHunter";
// import "./App.css";

// function App() {
//   return (
//     <div>
//       <NewsHunter />
//     </div>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsHunter from "./components/NewsHunter";
import Notes from "./components/Notes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsHunter />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;
