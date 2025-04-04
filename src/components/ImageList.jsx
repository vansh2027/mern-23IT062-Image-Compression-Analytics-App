import API from "../assets/api";

function ImageList({ images }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Uploaded Images</h2>
      {images.map((image) => (
        <div key={image._id} className="p-2 border-b">
          <img src={image.compressedUrl} alt="Compressed" className="w-24 h-24" />
          <a href={image.compressedUrl} download className="ml-4 text-blue-500">Download</a>
        </div>
      ))}
    </div>
  );
}

export default ImageList;
