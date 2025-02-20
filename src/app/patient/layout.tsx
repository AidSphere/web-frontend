import PatientLayout from '@/layouts/PatientLayout';
export default function patientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PatientLayout>{children}</PatientLayout>;
}
