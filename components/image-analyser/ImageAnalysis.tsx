"use client";
import { useImageAnalysis } from "@/app/context/imageAnalysisContext";

export default function ImageAnalysis() {
  const { imageAnalysis } = useImageAnalysis();
  console.log("in component", imageAnalysis);
  if (!imageAnalysis) {
    return (
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg pb-2">Assessment Result</h3>
          <div className="bg-[#f9fafc] h-full rounded-md min-h-28 pb-4">
            <p className="flex justify-center items-center h-full text-gray-600 text-sm">
              No wound analysis yet
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg pb-2">Care Instructions</h3>
          <div className="bg-[#f9fafc] h-full rounded-md min-h-28 mb-4">
            <p className="flex justify-center items-center h-full text-gray-600 text-sm">
              No care instructions yet
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg pb-2">Recommended Follow-up</h3>
          <div className="bg-[#f9fafc] h-full rounded-md min-h-28 mb-4">
            <p className="flex justify-center items-center h-full text-gray-600 text-sm">
              No recommendations yet
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { infected, confidence, care_instructions } = imageAnalysis;

  return (
    <div>
      <div>
        <h3 className="font-semibold text-lg">Assessment Result</h3>
        <p>{infected ? "Infected" : "Not Infected"}</p>
        <p>{confidence}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Care Instructions</h3>
        <p>{care_instructions}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Recommended Follow-up</h3>
        <div>{infected ? "Follow-up needed" : "No follow-up required"}</div>
      </div>
    </div>
  );
}
