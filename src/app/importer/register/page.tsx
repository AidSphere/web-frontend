/* eslint-disable tailwindcss/no-custom-classname */
"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  FaUser, 
  FaIdCard, 
  FaGlobe, 
  FaFileAlt, 
  FaPhone, 
  FaEnvelope, 
  FaLock, 
  FaSun, 
  FaMoon, 
  FaPassport, 
  FaFileUpload 
} from 'react-icons/fa';
import { Textarea } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { ThemeModeToggle } from '@/components/ThemeModeToggle';

// Define interface for registration data
interface RegistrationData {
  fullName: string;
  nic: string;
  email: string;
  licenseNumber: string;
  phoneNumber: string;
  website?: string;
  password: string;
  confirmPassword: string;
  additionalInfo?: string;
  nicProof?: File | null;
  licenseProof?: File | null;
}

const RegistrationPage = () => {


  
  // Registration form state
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: '',
    nic: '',
    email: '',
    licenseNumber: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    website: '',
    additionalInfo: '',
    nicProof: null,
    licenseProof: null,
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState<Partial<RegistrationData>>({});

  const router = useRouter();

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fileType: 'nicProof' | 'licenseProof'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }

      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload PDF, JPG, or PNG files only');
        return;
      }

      setRegistrationData((prev) => ({
        ...prev,
        [fileType]: file,
      }));
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const errors: Partial<RegistrationData> = {};

    // Required field checks
    if (!registrationData.fullName) errors.fullName = 'Full name is required';
    if (!registrationData.nic) errors.nic = 'NIC is required';
    if (!registrationData.email) errors.email = 'Email is required';
    if (!registrationData.licenseNumber) errors.licenseNumber = 'License number is required';
    if (!registrationData.phoneNumber) errors.phoneNumber = 'Phone number is required';
    if (!registrationData.password) errors.password = 'Password is required';
    if (!registrationData.confirmPassword) errors.confirmPassword = 'Confirm password is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (registrationData.email && !emailRegex.test(registrationData.email)) {
      errors.email = 'Invalid email address';
    }

    // Password validation
    if (registrationData.password && registrationData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (registrationData.password !== registrationData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Phone number validation (basic)
    const phoneRegex = /^\+?[0-9]{10,14}$/;
    if (registrationData.phoneNumber && !phoneRegex.test(registrationData.phoneNumber.replace(/\s/g, ''))) {
      errors.phoneNumber = 'Invalid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to navigate to email verification page
  const navigateToEmailVerification = () => {
    console.log('Registration Data:', registrationData);

    if (validateForm()) {
      // Navigate to the verification page
      router.push(`/auth/verification?type=ACCOUNT_ACTIVATION&email=${registrationData.email}`);
    } else {
      console.log('Form validation failed:', formErrors);
    }
  };

  // Handle form submission
  const handleRegistration = (e: FormEvent) => {
    e.preventDefault();
    navigateToEmailVerification();
  };
  return (
    <div className="flex h-screen w-full relative">
      {/* Theme toggle positioned in the top right */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeModeToggle />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-5">
        <Card className="w-full max-w-xl h-[95vh] p-4 shadow-lg border-sidebar-border flex flex-col overflow-y-auto">
          {/* Form header */}
          <div className="text-center mb-3">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Registration Request Form
            </h1>
            <p className="text-sm text-foreground/70">
              Create an account to access the medical portal
            </p>
          </div>
          
          {/* Form content */}
          <form className="flex flex-col grow" onSubmit={handleRegistration}>
            <div className="grow grid grid-cols-1 gap-3">
              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {/* Full Name field */}
                <div className="space-y-1">
                  <label htmlFor="fullName" className="text-xs font-medium text-foreground/80">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <FaUser className="size-3.5 text-foreground/40" />
                    </div>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      type="text" 
                      value={registrationData.fullName}
                      onChange={handleInputChange}
                      required 
                      className="pl-8 py-1 h-9 text-sm bg-background focus:border-primary"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                </div>
                
                {/* NIC field */}
                <div className="space-y-1">
                  <label htmlFor="nic" className="text-xs font-medium text-foreground/80">
                    NIC
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <FaIdCard className="size-3.5 text-foreground/40" />
                    </div>
                    <Input 
                      id="nic" 
                      name="nic" 
                      type="text" 
                      value={registrationData.nic}
                      onChange={handleInputChange}
                      required 
                      className="pl-8 py-1 h-9 text-sm bg-background focus:border-primary"
                      placeholder="123456789X"
                    />
                  </div>
                </div>
                
                {/* Email field */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-medium text-foreground/80">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <FaEnvelope className="size-3.5 text-foreground/40" />
                    </div>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={registrationData.email}
                      onChange={handleInputChange}
                      required 
                      className={`pl-8 py-1 h-9 text-sm bg-background focus:border-primary 
                        ${formErrors.email ? 'border-destructive' : ''}`}
                      placeholder="example@gmail.com"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-destructive mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                
                {/* License Number field */}
                <div className="space-y-1">
                  <label htmlFor="licenseNumber" className="text-xs font-medium text-foreground/80">
                    License Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <FaFileAlt className="size-3.5 text-foreground/40" />
                    </div>
                    <Input 
                      id="licenseNumber" 
                      name="licenseNumber" 
                      type="text" 
                      value={registrationData.licenseNumber}
                      onChange={handleInputChange}
                      required 
                      className="pl-8 py-1 h-9 text-sm bg-background focus:border-primary"
                      placeholder="MED-12345"
                    />
                  </div>
                </div>
                
                {/* Phone Number field */}
                <div className="space-y-1">
                  <label htmlFor="phoneNumber" className="text-xs font-medium text-foreground/80">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <FaPhone className="size-3.5 text-foreground/40" />
                    </div>
                    <Input 
                      id="phoneNumber" 
                      name="phoneNumber" 
                      type="tel" 
                      value={registrationData.phoneNumber}
                      onChange={handleInputChange}
                      required 
                      className={`pl-8 py-1 h-9 text-sm bg-background focus:border-primary 
                        ${formErrors.phoneNumber ? 'border-destructive' : ''}`}
                      placeholder="+94 123 456 678"
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-xs text-destructive mt-1">{formErrors.phoneNumber}</p>
                    )}
                  </div>
                </div>
                
                {/* Website field */}
                <div className="space-y-1">
                  <label htmlFor="website" className="text-xs font-medium text-foreground/80">
                    Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <FaGlobe className="size-3.5 text-foreground/40" />
                    </div>
                    <Input 
                      id="website" 
                      name="website" 
                      type="url" 
                      value={registrationData.website}
                      onChange={handleInputChange}
                      className="pl-8 py-1 h-9 text-sm bg-background focus:border-primary"
                      placeholder="https://yourdomain.com"
                    />
                  </div>
                </div>
              </div>
        
              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Password field */}
                <div className="space-y-1">
                  <label htmlFor="password" className="text-xs font-medium text-foreground/80">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <FaLock className="size-3.5 text-foreground/40" />
                    </div>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      value={registrationData.password}
                      onChange={handleInputChange}
                      required 
                      className={`pl-8 py-1 h-9 text-sm bg-background focus:border-primary 
                        ${formErrors.password ? 'border-destructive' : ''}`}
                      placeholder="••••••••"
                    />
                    {formErrors.password && (
                      <p className="text-xs text-destructive mt-1">{formErrors.password}</p>
                    )}
                  </div>
                </div>
                
                {/* Confirm Password field */}
                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="text-xs font-medium text-foreground/80">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <FaLock className="size-3.5 text-foreground/40" />
                    </div>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      value={registrationData.confirmPassword}
                      onChange={handleInputChange}
                      required 
                      className={`pl-8 py-1 h-9 text-sm bg-background focus:border-primary 
                        ${formErrors.confirmPassword ? 'border-destructive' : ''}`}
                        placeholder="••••••••"
                        />
                        {formErrors.confirmPassword && (
                          <p className="text-xs text-destructive mt-1">{formErrors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Information */}
                  <div className="space-y-1">
                    <label htmlFor="additionalInfo" className="text-xs font-medium text-foreground/80">
                      Additional Information
                    </label>
                    <Textarea 
                      id="additionalInfo" 
                      name="additionalInfo" 
                      value={registrationData.additionalInfo}
                      onChange={handleInputChange}
                      className="bg-background min-h-[60px] h-16 text-sm focus:border-primary resize-none"
                      placeholder="Please share any additional details about your practice"
                    />
                  </div>
                  
                  {/* File Upload Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* NIC Proof Upload */}
                    <div className="space-y-1">
                      <label htmlFor="nicProof" className="text-xs font-medium text-foreground/80">
                        NIC Proof
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-primary/5 border-sidebar-border transition-colors">
                          <div className="flex items-center justify-center space-x-2">
                            <FaPassport className="size-5 text-primary" />
                            <div>
                              <p className="text-xs font-semibold text-foreground/70">
                                {registrationData.nicProof 
                                  ? registrationData.nicProof.name 
                                  : "Upload NIC document"}
                              </p>
                              <p className="text-xs text-foreground/50">PDF, JPG, PNG (MAX. 5MB)</p>
                            </div>
                          </div>
                          <input 
                            id="nicProof" 
                            name="nicProof" 
                            type="file" 
                            className="hidden" 
                            onChange={(e) => handleFileChange(e, 'nicProof')}
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                        </label>
                      </div>
                    </div>
                    
                    {/* License Proof Upload */}
                    <div className="space-y-1">
                      <label htmlFor="licenseProof" className="text-xs font-medium text-foreground/80">
                        License Proof
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-primary/5 border-sidebar-border transition-colors">
                          <div className="flex items-center justify-center space-x-2">
                            <FaFileUpload className="size-5 text-primary" />
                            <div>
                              <p className="text-xs font-semibold text-foreground/70">
                                {registrationData.licenseProof 
                                  ? registrationData.licenseProof.name 
                                  : "Upload license document"}
                              </p>
                              <p className="text-xs text-foreground/50">PDF, JPG, PNG (MAX. 5MB)</p>
                            </div>
                          </div>
                          <input 
                            id="licenseProof" 
                            name="licenseProof" 
                            type="file" 
                            className="hidden" 
                            onChange={(e) => handleFileChange(e, 'licenseProof')}
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="pt-2 space-y-2 mt-3">
                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-600 text-white h-10"
                    size="sm"
                  >
                    Submit Registration
                  </Button>
                  
                  {/* Login redirect text */}
                  <div className="text-center">
                    <p className="text-xs text-foreground/70">
                      Already have an account?{' '}
                      <Link href="/auth/login" className="font-medium text-primary hover:text-primary-600 transition-colors">
                        Sign in instead
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </Card>
          </div>
          
          {/* Image Section */}
          <div className="hidden lg:block lg:w-1/2 bg-primary/5 relative h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1887&auto=format&fit=crop" 
                alt="Medical professional" 
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Gradient overlay */}
            <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-primary/20 to-transparent text-center z-10">
              <h2 className="text-xl md:text-2xl font-bold text-primary">Join Our Medical Community</h2>
              <p className="text-foreground/80">Access advanced tools for medical professionals</p>
            </div>
          </div>
        </div>
      );
    };
    
    export default RegistrationPage;