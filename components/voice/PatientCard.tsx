export default function PatientCard() {
  const patientInfo = [
    { label: "Patient", value: "Jon Doe" },
    { label: "Id", value: "1234567" },
    { label: "Dob", value: "01/01/1990" },
    { label: "Date", value: new Date().toLocaleDateString() },
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
