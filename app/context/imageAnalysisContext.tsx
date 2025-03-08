"use client";
import React, { createContext, useContext, useState } from "react";

export interface AnalysisData {
  infected: boolean;
  care_instructions: string;
  is_wound: boolean;
}

interface ImageAnalysisContextType {
  imageAnalysis: AnalysisData | null;
  setImageAnalysis: React.Dispatch<React.SetStateAction<AnalysisData | null>>;
}

const ImageAnalysisContext = createContext<
  ImageAnalysisContextType | undefined
>(undefined);

export const useImageAnalysis = () => {
  const context = useContext(ImageAnalysisContext);
  if (!context) {
    throw new Error(
      "useImageAnalysis must be used within a ImageAnalysisProvider"
    );
  }
  return context;
};

export const ImageAnalysisProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [imageAnalysis, setImageAnalysis] = useState<AnalysisData | null>(null);

  return (
    <ImageAnalysisContext.Provider value={{ imageAnalysis, setImageAnalysis }}>
      {children}
    </ImageAnalysisContext.Provider>
  );
};
