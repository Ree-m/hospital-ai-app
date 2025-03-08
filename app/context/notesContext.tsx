"use client";
import React, { createContext, useContext, useState } from "react";

export interface NotesInterface {
  [key: string]: string;
}

interface NotesContextType {
  notes: NotesInterface;
  setNotes: React.Dispatch<React.SetStateAction<NotesInterface>>;
}

const notesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(notesContext);
  if (!context) {
    throw new Error("usenotes must be used within a notesProvider");
  }
  return context;
};

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<NotesInterface>({
    "Chief Complaint": "",
    "History of Present Illness": "",
    "Examination Findings": "",
    "Assessment and Plan": "",
    "Medications and Allergies": "",
  });

  return (
    <notesContext.Provider value={{ notes, setNotes }}>
      {children}
    </notesContext.Provider>
  );
};
