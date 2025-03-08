"use client";
import { useState } from "react";
import { useNotes } from "@/app/context/notesContext";
import Note from "./Note";
import { Button } from "../ui/button";
import { NotesInterface } from "@/app/context/notesContext";
import NotePreviewModal from "./NotePreviewModal";

export interface Patient {
  name: string;
  dob: string;
  id: string;
  date: string;
}

export default function Notes() {
  const { notes, setNotes } = useNotes();
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    setNotes((prevNotes: NotesInterface) =>
      Object.keys(prevNotes).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {} as NotesInterface)
    );
  };

  const mockPatientInfo: Patient = {
    name: "John Doe",
    dob: "1990-01-01",
    id: "123456",
    date: new Date().toLocaleDateString(),
  };

  return (
    <div className="border-t">
      <h2 className="mt-6 pb-6 font-bold text-2xl">Clinical Documentation</h2>
      <div className="mt-4 space-y-4">
        {Object.entries(notes).map(([key, value]) => (
          <Note key={key} title={key} value={value} />
        ))}
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <Button
          onClick={handleClear}
          disabled={Object.values(notes).every((value) => value === "")}
          className="hover:cursor-pointer disabled:cursor-auto"
        >
          Clear All
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          className="hover:cursor-pointer disabled:cursor-auto"
        >
          Preview
        </Button>
        <NotePreviewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          notes={notes}
          patient={mockPatientInfo}
        />
      </div>
    </div>
  );
}
