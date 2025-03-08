import { Patient } from "./Notes";

export default function PatientCard({ patient }: { patient: Patient }) {
  const { name, id, dob, date } = patient;
  const patientInfo = [
    { label: "Patient", value: name },
    { label: "Id", value: id },
    { label: "Dob", value: dob },
    { label: "Date", value: date },
  ];

  return (
    <div className="bg-[#f9fafc] p-4 rounded-md mb-4 flex justify-between border mr-2">
      {patientInfo.map(({ label, value }) => (
        <div key={label} className="flex flex-col space-y-2">
          <p className="text-sm uppercase text-gray-600">{label}</p>
          <p className="text-sm">{value}</p>
        </div>
      ))}
    </div>
  );
}
