import { Textarea } from "@/components/ui/textarea";

export default function Note({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <h3 className="pb-2">{title}</h3>
      <Textarea
        value={value}
        onChange={(e) => {}}
        placeholder={`No ${title} were provided`}
        className="min-h-24"
      />
    </div>
  );
}
