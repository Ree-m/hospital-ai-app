"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Patient } from "./Notes";
import PatientCard from "./PatientCard";

interface PreviewModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  notes: Record<string, string>;
  patient: Patient;
}

export default function NotePreviewModal({
  isOpen,
  setIsOpen,
  notes,
  patient,
}: PreviewModalProps) {
  const notesArray = Object.entries(notes);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-1/2">
        <PatientCard patient={patient} />
        <DialogHeader>
          <DialogTitle className="flex text-xl font-semibold justify-center">
            Clinical Note
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm border p-4 rounded-md">
          {notesArray.map(([key, value]) => (
            <div key={key} className="pb-4">
              <h4 className="font-semibold text-lg border-b pb-2 mb-2">
                {key}
              </h4>
              <p className="text-gray-600">
                {value || "No information provided."}
              </p>
            </div>
          ))}
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
