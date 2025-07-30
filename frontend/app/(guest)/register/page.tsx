"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowBigLeft } from "lucide-react";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name must be 50 characters or less" }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    terms: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9ec3c3] to-[#6da9a4] p-4 sm:p-6">
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-white bg-[#2a8d87] hover:bg-[#1e6d68] transition-colors px-4 py-2 rounded-lg shadow-md"
        >
          <ArrowBigLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
      </div>

      <Card className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row">
          <Card className="w-full md:w-1/2 bg-gradient-to-br from-[#c1dbdb] to-[#a8d1d1] p-6 sm:p-8 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-full max-w-xs">
              <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 bg-white/90 rounded-full flex flex-col items-center justify-center shadow-lg relative z-10 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl font-bold text-[#2a8d87]">
                  E
                </div>
                <div className="text-xl sm:text-2xl font-semibold text-gray-700">
                  ECHO
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Schools
                </div>
              </div>
              <div className="absolute w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 bg-teal-300/50 rounded-full top-1 -right-1 z-0 backdrop-blur-sm animate-pulse-slow"></div>
            </div>
          </Card>

          <Card className="w-full md:w-1/2 bg-white/95 backdrop-blur-sm">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Create Your Account
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Join our community to get started
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            className="py-5 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#2a8d87] focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Email
                        </FormLabel>
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

                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Create password"
                              {...field}
                              className="py-5 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#2a8d87] focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm password"
                              {...field}
                              className="py-5 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#2a8d87] focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3">
                        <FormControl>
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 border-gray-400 data-[state=checked]:bg-[#2a8d87]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel
                            htmlFor="terms"
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            I agree to the{" "}
                            <Link
                              href="#"
                              className="text-[#2a8d87] font-medium hover:underline"
                            >
                              terms and conditions
                            </Link>
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full py-6 rounded-xl bg-gradient-to-r from-[#2a8d87] to-[#1e6d68] hover:from-[#237874] hover:to-[#165651] text-white font-medium shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                    disabled={form.formState.isSubmitting}
                  >
                    Create Account
                  </Button>

                  <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#2a8d87] font-medium hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </form>
              </Form>

              <p className="mt-10 text-xs text-center text-gray-400">
                @echoschools2022
              </p>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
