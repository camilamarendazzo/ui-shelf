import { Route, Routes } from "react-router";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ContrastChecker from "./tools/contrast-checker/ContrastChecker";
import PaletteGenerator from "./tools/palette-generator/PaletteGenerator";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contrast-checker" element={<ContrastChecker />} />
        <Route path="palette-generator" element={<PaletteGenerator />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
