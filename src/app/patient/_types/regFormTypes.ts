import { ZonedDateTime } from '@internationalized/date';
import { z } from 'zod';

// Define allowed government ID types
export const IDTypeEnum = z.enum(['NIC', 'BIRTH_CERTIFICATE', 'PASSPORT']);

// Step one validation schema
export const patientSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name is too long'),
  dateOfBirth: z.custom<ZonedDateTime>(
    (val) => {
      return val instanceof ZonedDateTime;
    },
    { message: 'Invalid DateTime format' }
  ),
  gender: z.enum(['Male', 'Female', 'Other'], {
    message: 'Invalid gender selection',
  }),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^\+?\d{10,15}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email format'),
  permanentAddress: z
    .string()
    .min(5, 'Permanent address is required')
    .max(255, 'Address too long'),
  currentAddress: z.string().max(255, 'Address too long'),
  profileImage: z
    .any()
    .refine((file) => file instanceof File, 'Profile image is required'),
  governmentIdType: IDTypeEnum,
  governmentIdNumber: z
    .string()
    .min(5, 'ID number must be at least 5 characters')
    .max(20, 'ID number too long'),
  governmentIdDocument: z
    .any()
    .refine(
      (file) => file instanceof File,
      'Government ID document is required'
    ),
});

export type PatientFormData = z.infer<typeof patientSchema>;
