import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ImageList from "./components/ImageList";
import AnalyticsChart from "./components/AnalyticsChart";
import LogsViewer from "./components/LogsViewer";

function App() {
  const [images, setImages] = useState([]);

  const handleUpload = (newImage) => {
    setImages([...images, newImage]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Compressor</h1>
      <UploadForm onUpload={handleUpload} />
      <ImageList images={images} />
      <AnalyticsChart />
      <LogsViewer />
    </div>
  );
}

export default App;

