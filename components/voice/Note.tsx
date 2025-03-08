"use client";
import { Textarea } from "@/components/ui/textarea";
import { NotesInterface, useNotes } from "@/app/context/notesContext";

export default function Note({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  const { setNotes } = useNotes();

  return (
    <div>
      <h3 className="pb-2">{title}</h3>
      <Textarea
        value={value}
        onChange={(e) => {
          setNotes((prevNotes: NotesInterface) => ({
            ...prevNotes,
            [title]: e.target.value,
          }));
        }}
        placeholder={`No ${title} were provided`}
        className="min-h-24"
      />
    </div>
  );
}
