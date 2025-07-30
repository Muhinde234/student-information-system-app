'use client';

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { CheckCircle } from "lucide-react";


const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }).min(1, { message: "Email is required" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      console.log("Password reset requested for:", data.email);
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9ec3c3] to-[#6da9a4] p-4 sm:p-6">
      <Card className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Branding */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-[#c1dbdb] to-[#a8d1d1] p-6 sm:p-8 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-full max-w-xs">
              <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 bg-white/90 rounded-full flex flex-col items-center justify-center shadow-lg relative z-10 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl font-bold text-[#2a8d87]">E</div>
                <div className="text-xl sm:text-2xl font-semibold text-gray-700">ECHO</div>
                <div className="text-sm sm:text-base text-gray-600">Schools</div>
              </div>
              <div className="absolute w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 bg-teal-300/50 rounded-full top-1 -right-1 z-0 backdrop-blur-sm animate-pulse-slow"></div>
            </div>
          </div>

          {/* Right Panel - Forgot Password Form */}
          <div className="w-full md:w-1/2 bg-white/95 backdrop-blur-sm">
            <div className="p-6 sm:p-8 md:p-10">
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Forgot Password?</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                      Enter your email to reset your password
                    </p>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your email" 
                                {...field} 
                                className="py-5 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#2a8d87] focus:border-transparent"
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500" />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        className="w-full py-6 rounded-xl bg-gradient-to-r from-[#2a8d87] to-[#1e6d68] hover:from-[#237874] hover:to-[#165651] text-white font-medium shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending instructions..." : "Reset Password"}
                      </Button>
                      
                      <div className="mt-4 text-center">
                        <Link 
                          href="/login" 
                          className="text-sm text-[#2a8d87] font-medium hover:underline"
                        >
                          Back to Sign In
                        </Link>
                      </div>
                    </form>
                  </Form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Instructions Sent!</h2>
                  <p className="text-gray-600 mb-6 max-w-md">
                    We've sent password reset instructions to your email. Please check your inbox and follow the steps to reset your password.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="py-6 px-8 rounded-xl bg-gradient-to-r from-[#2a8d87] to-[#1e6d68] hover:from-[#237874] hover:to-[#165651] text-white font-medium shadow-md transition-all duration-300"
                    >
                      Resend Instructions
                    </Button>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="py-6 px-8 rounded-xl border-[#2a8d87] text-[#2a8d87] hover:bg-[#2a8d87]/10 font-medium shadow-sm transition-all duration-300"
                      >
                        Return to Login
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <p className="mt-10 text-xs text-center text-gray-400">@echoschools2022</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}