import PatientRequestTable from './_components/PatientRequestTable';
import { ToastProvider } from '@heroui/react';
const PatientRequest = () => {
  return (
    <div>
      <h1 className='p-3 text-center text-3xl font-bold'>Patient Requests</h1>
      <PatientRequestTable />
    </div>
  );
};

export default PatientRequest;
