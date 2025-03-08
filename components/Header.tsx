import { Activity } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto p-6">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <Activity className="h-8 w-8 text-blue-600" strokeWidth={2} />
          <span>HospitalAi</span>
        </Link>
      </div>
    </header>
  );
}
