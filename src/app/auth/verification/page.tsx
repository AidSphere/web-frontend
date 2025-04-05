
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useSearchParams, useRouter } from 'next/navigation';

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [pageType, setPageType] = useState<'EMAIL_VERIFICATION' | 'ACCOUNT_ACTIVATION' | 'PASSWORD_RESET'>('EMAIL_VERIFICATION');
  const [userEmail, setUserEmail] = useState('your email');
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract parameters from URL on component mount
  useEffect(() => {
    const type = searchParams.get('type') as 'EMAIL_VERIFICATION' | 'ACCOUNT_ACTIVATION' | 'PASSWORD_RESET' | null;
    const email = searchParams.get('email');
    
    if (type && ['EMAIL_VERIFICATION', 'ACCOUNT_ACTIVATION', 'PASSWORD_RESET'].includes(type)) {
      setPageType(type);
    }
    
    if (email) {
      setUserEmail(email);
    }
  }, [searchParams]);

  // Configuration based on type
  const config = {
    EMAIL_VERIFICATION: {
      title: 'Verify Your Email',
      description: `We've sent a verification code to ${userEmail}. Please enter the code below to verify your account.`,
      icon: <FaEnvelope className="text-primary size-8" />,
      iconBgColor: 'bg-primary/10',
      buttonText: 'Verify Email',
      successRedirect: '/auth/verification-success',
      placeholder: 'Enter 6-digit code',
      helpText: "Didn't receive the code?",
      actionText: 'Resend verification code'
    },
    ACCOUNT_ACTIVATION: {
      title: 'Activate Your Account',
      description: `We've sent an activation code to ${userEmail}. Please enter the code below to activate your account.`,
      icon: <FaUser className="text-primary size-8" />,
      iconBgColor: 'bg-primary/10',
      buttonText: 'Activate Account',
      successRedirect: `/auth/verification-success?type=ACCOUNT_ACTIVATION`,
      placeholder: 'Enter activation code',
      helpText: "Didn't receive the activation code?",
      actionText: 'Resend activation code'
    },
    PASSWORD_RESET: {
      title: 'Reset Your Password',
      description: `We've sent a password reset code to ${userEmail}. Please enter the code below to continue.`,
      icon: <FaLock className="text-primary size-8" />,
      iconBgColor: 'bg-primary/10',
      buttonText: 'Verify Code',
      successRedirect: '/auth/reset-password',
      placeholder: 'Enter reset code',
      helpText: "Didn't receive the reset code?",
      actionText: 'Resend reset code'
    }
  };

  // Get the appropriate configuration
  const currentConfig = config[pageType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulating API call
    // In a real application, you would call your verification API here
    // if (pageType === 'EMAIL_VERIFICATION') await verifyEmail(verificationCode);
    // else if (pageType === 'ACCOUNT_ACTIVATION') await activateAccount(verificationCode);
    // else if (pageType === 'PASSWORD_RESET') await verifyResetCode(verificationCode);
    
    // Simulate API response delay
    setTimeout(() => {
      setIsVerifying(false);
      router.push(currentConfig.successRedirect);
    }, 1500);
  };

  const handleResendCode = () => {
    // Implement code resend logic based on type
    console.log(`Resending code for ${pageType} to ${userEmail}`);
    // Example: resendVerificationCode(userEmail, pageType);
  };

  return (
    <div className="flex h-screen">
      {/* Theme toggle positioned in the top right */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    
      <div className="w-full flex items-center justify-center p-5">
        <Card className="w-full max-w-md p-6 shadow-lg border-sidebar-border">
          <div className="text-center mb-6">
            <div className={`mx-auto w-16 h-16 ${currentConfig.iconBgColor} rounded-full flex items-center justify-center mb-4`}>
              {currentConfig.icon}
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {currentConfig.title}
            </h1>
            <p className="mt-2 text-foreground/70">
              {currentConfig.description}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="verificationCode" className="text-sm font-medium text-foreground/80">
                Verification Code
              </label>
              <Input 
                id="verificationCode" 
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder={currentConfig.placeholder}
                className="bg-background text-center text-xl tracking-widest py-6"
                maxLength={6}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-600 text-white" 
              size="lg"
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : currentConfig.buttonText}
            </Button>
            
            <div className="text-center text-sm text-foreground/70">
              <p>{currentConfig.helpText}</p>
              <button 
                type="button" 
                className="text-primary hover:text-primary-600 font-medium mt-1"
                onClick={handleResendCode}
              >
                {currentConfig.actionText}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default VerificationPage;
