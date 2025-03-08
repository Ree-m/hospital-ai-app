import { ImageUploader } from "@/components/image-analyser/ImageUploader";
import ImageAnalysis from "@/components/image-analyser/ImageAnalysis";

export default function ImageAnalayserPage() {
  return (
    <div className="bg-white border rounded-md m-4 md:m-10 grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-x-4 p-4 md:pt-10">
      <ImageUploader />
      <ImageAnalysis />
    </div>
  );
}
