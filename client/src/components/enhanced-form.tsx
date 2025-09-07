import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Mail, Lock, Loader2 } from 'lucide-react';

// Enhanced form schema with comprehensive validation
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type FormData = z.infer<typeof formSchema>;

interface EnhancedFormProps {
  title?: string;
  subtitle?: string;
  onSubmit: (data: FormData) => Promise<void>;
  submitButtonText?: string;
  isLoading?: boolean;
}

export default function EnhancedForm({ 
  title = "Join the Club",
  subtitle = "Create your account to access exclusive features",
  onSubmit,
  submitButtonText = "Create Account",
  isLoading = false
}: EnhancedFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationStates, setValidationStates] = useState<{
    [key: string]: 'valid' | 'invalid' | 'neutral';
  }>({
    email: 'neutral',
    password: 'neutral',
    confirmPassword: 'neutral'
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    mode: 'onChange'
  });

  const handleSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(data);
      form.reset();
      setValidationStates({
        email: 'neutral',
        password: 'neutral',
        confirmPassword: 'neutral'
      });
      
      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
        className: "bg-emerald-900/90 text-emerald-100 border-emerald-700"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateValidationState = (fieldName: string, isValid: boolean) => {
    setValidationStates(prev => ({
      ...prev,
      [fieldName]: isValid ? 'valid' : 'invalid'
    }));
  };

  const getFieldIcon = (fieldName: string, defaultIcon: React.ReactNode) => {
    const state = validationStates[fieldName];
    if (state === 'valid') return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    if (state === 'invalid') return <AlertCircle className="w-5 h-5 text-red-400" />;
    return defaultIcon;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="luxury-card p-8 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-playfair text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-300 font-inter">
            {subtitle}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium flex items-center gap-2">
                    {getFieldIcon('email', <Mail className="w-4 h-4" />)}
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                      onChange={(e) => {
                        field.onChange(e);
                        updateValidationState('email', !fieldState.error);
                      }}
                      className={`
                        transition-all duration-200
                        ${fieldState.error 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25' 
                          : validationStates.email === 'valid'
                          ? 'border-emerald-500 focus:border-emerald-400'
                          : 'border-gray-700 focus:border-emerald-500'
                        }
                      `}
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium flex items-center gap-2">
                    {getFieldIcon('password', <Lock className="w-4 h-4" />)}
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Create a secure password"
                      onChange={(e) => {
                        field.onChange(e);
                        updateValidationState('password', !fieldState.error);
                      }}
                      className={`
                        transition-all duration-200
                        ${fieldState.error 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25' 
                          : validationStates.password === 'valid'
                          ? 'border-emerald-500 focus:border-emerald-400'
                          : 'border-gray-700 focus:border-emerald-500'
                        }
                      `}
                      data-testid="input-password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                  <div className="text-xs text-gray-400 mt-1">
                    Must include uppercase, lowercase, and numbers
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium flex items-center gap-2">
                    {getFieldIcon('confirmPassword', <Lock className="w-4 h-4" />)}
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm your password"
                      onChange={(e) => {
                        field.onChange(e);
                        updateValidationState('confirmPassword', !fieldState.error);
                      }}
                      className={`
                        transition-all duration-200
                        ${fieldState.error 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25' 
                          : validationStates.confirmPassword === 'valid'
                          ? 'border-emerald-500 focus:border-emerald-400'
                          : 'border-gray-700 focus:border-emerald-500'
                        }
                      `}
                      data-testid="input-confirm-password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting || isLoading || !form.formState.isValid}
              className={`
                w-full h-12 text-lg font-semibold transition-all duration-200
                ${form.formState.isValid && !isSubmitting
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }
              `}
              data-testid="button-submit"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </div>
              ) : (
                submitButtonText
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}