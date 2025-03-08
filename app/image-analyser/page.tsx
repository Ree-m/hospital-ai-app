import { ImageUploader } from "@/components/image-analyser/ImageUploader";
import ImageAnalysis from "@/components/image-analyser/ImageAnalysis";

export default function ImageAnalayserPage() {
  return (
    <div className="bg-white border rounded-md m-10 p-10 grid grid-cols-2 space-x-4 p-4">
      <ImageUploader />
      <ImageAnalysis />
    </div>
  );
}
