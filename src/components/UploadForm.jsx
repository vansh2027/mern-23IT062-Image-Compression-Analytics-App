import { useState } from "react";
import API from "../assets/api";

function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    const res = await API.post("/images", formData);
    onUpload(res.data);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2">
        Upload
      </button>
    </form>
  );
}

export default UploadForm;
