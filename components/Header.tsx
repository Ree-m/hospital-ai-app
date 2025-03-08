import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto p-6">
        <Link href="/" className="text-3xl font-bold">
          HospitalAi
        </Link>
      </div>
    </header>
  );
}
