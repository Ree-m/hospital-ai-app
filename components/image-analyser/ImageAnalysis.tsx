"use client";
import { useImageAnalysis } from "@/app/context/imageAnalysisContext";
import { Badge } from "@/components/ui/badge";

const AnalysisSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-4">
    <h3 className="font-semibold text-lg pb-2">{title}</h3>
    <div>{children}</div>
  </div>
);

const EmptySection = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center bg-[#f9fafc] h-full rounded-md min-h-28 mb-4">
    <p className="text-gray-600 text-sm">{message}</p>
  </div>
);

export default function ImageAnalysis() {
  const { imageAnalysis } = useImageAnalysis();

  if (!imageAnalysis) {
    return (
      <div className="flex flex-col justify-between">
        <AnalysisSection title="Assessment Result">
          <EmptySection message="No wound analysis yet" />
        </AnalysisSection>

        <AnalysisSection title="Care Instructions">
          <EmptySection message="No care instructions yet" />
        </AnalysisSection>

        <AnalysisSection title="Recommended Follow-up">
          <EmptySection message="No recommendations yet" />
        </AnalysisSection>
      </div>
    );
  }

  const { is_wound, infected, care_instructions } = imageAnalysis;

  if (!is_wound) {
    return (
      <div className="flex flex-col justify-between">
        <AnalysisSection title="Assessment Result">
          <div className="border rounded-md border-gray-500 bg-gray-100 p-4 min-h-28 mb-4">
            <Badge className="bg-gray-600 text-white text-base mb-1 rounded-full">
              Not a wound
            </Badge>
            <p className="text-gray-700">
              This image does not appear to be a wound.
            </p>
          </div>
        </AnalysisSection>

        <AnalysisSection title="Care Instructions">
          <EmptySection message="No care instructions needed." />
        </AnalysisSection>

        <AnalysisSection title="Recommended Follow-up">
          <EmptySection message="No follow-up required." />
        </AnalysisSection>
      </div>
    );
  }

  return (
    <div>
      <AnalysisSection title="Assessment Result">
        {infected ? (
          <div className="border rounded-md border-red-500 bg-red-100 p-4 min-h-28 mb-4">
            <Badge
              variant="destructive"
              className="bg-red-600 text-white mb-1 text-base rounded-full"
            >
              Potentially infected
            </Badge>
            <p className="text-red-700">
              Signs of infection detected. Immediate attention recommended.
            </p>
          </div>
        ) : (
          <div className="border rounded-md border-green-500 bg-green-100 p-4 min-h-28 mb-4">
            <Badge className="bg-green-600 text-white text-base mb-1 rounded-full">
              Normal
            </Badge>
            <p className="text-green-700">Signs of infection not detected.</p>
          </div>
        )}
      </AnalysisSection>

      <AnalysisSection title="Care Instructions">
        <div className="border rounded-md p-4 min-h-28 mb-4">
          <p className="text-gray-600">
            {care_instructions?.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </AnalysisSection>

      <AnalysisSection title="Recommended Follow-up">
        <div className="min-h-28 p-4 border border-blue-500 bg-blue-100 rounded-md mb-4">
          <p className="text-blue-700 pb-2">Schedule Follow-up Assessment</p>
          {infected ? (
            <div>
              <p className="text-blue-700">
                Upload new image in 48 hours to track healing progress
              </p>
            </div>
          ) : (
            <div>
              <p className="text-blue-700">Follow-up not required</p>
            </div>
          )}
        </div>
      </AnalysisSection>
    </div>
  );
}
