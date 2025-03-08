import { Patient } from "./Notes";

export default function PatientCard({ patient }: { patient: Patient }) {
  const { name, id, dob, date } = patient;
  return (
    <div className="bg-[#f9fafc] p-4 rounded-md mb-4 flex justify-around border mr-2">
      <div className="flex-col space-y-2">
        <p className="text-sm uppercase mb-0 text-gray-600">Patient</p>
        <p className="text-sm">{name}</p>
      </div>
      <div className="flex-col space-y-2">
        <p className="text-sm uppercase mb-0 text-gray-600">Id</p>
        <p className="text-sm">{id}</p>
      </div>
      <div className="flex-col space-y-2">
        <p className="text-sm uppercase mb-0 text-gray-600">Dob</p>
        <p className="text-sm">{dob}</p>
      </div>
      <div className="flex-col space-y-2">
        <p className="text-sm uppercase mb-0 text-gray-600">Date</p>
        <p className="text-sm">{date}</p>
      </div>
    </div>
  );
}
