import { z } from 'zod';

export const medicineItemSchema = z.object({
  medicine: z.string().min(1, { message: 'Medicine name is required' }),
  amount: z.string().min(1, { message: 'Amount is required' }),
  unit: z
    .string()
    .min(1, { message: 'Unit is required' })
    .max(10, { message: 'Unit is too long' }),
});

// Extended schema with patient information
export const BasicInfoSchema = z.object({
  // basic information
  requestName: z.string().min(2, { message: 'Patient name is required' }),
  expectedDate: z.date().min(new Date(), { message: 'Date must be in future' }),
  description: z.string().min(1, { message: 'Description is required' }),
  prescriptionUrl: z.instanceof(File),
  // Prescription items
  items: z
    .array(medicineItemSchema)
    .min(1, { message: 'At least one medicine is required' }),
});

export type MedicineItem = z.infer<typeof medicineItemSchema>;
export type BasicInfoFormValues = z.infer<typeof BasicInfoSchema>;
