import VoiceRecorder from "@/components/voice/VoiceRecorder";
import Notes from "@/components/voice/Notes";

export default function VoicePage() {
  return (
    <div className="border rounded-md m-4 p-6 md:m-10 md:p-10 bg-white">
      <VoiceRecorder />
      <Notes />
    </div>
  );
}
