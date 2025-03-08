import VoiceRecorder from "@/components/voice/VoiceRecorder";
import Notes from "@/components/voice/Notes";

export default function VoicePage() {
  return (
    <div className="border rounded-md m-10 p-10 bg-white">
      <VoiceRecorder />
      <Notes />
    </div>
  );
}
