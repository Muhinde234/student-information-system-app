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

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  remember: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
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
          <div className="w-full md:w-1/2 bg-gradient-to-br from-[#c1dbdb] to-[#a8d1d1] p-6 sm:p-8 flex items-center justify-center">
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
          </div>

          {/* Right Panel - Login Form */}
          <div className="w-full md:w-1/2 bg-white/95 backdrop-blur-sm">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Welcome Back
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Sign in to continue your journey
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
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
                            placeholder="Enter password"
                            {...field}
                            className="py-5 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#2a8d87] focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between items-center">
                    <FormField
                      control={form.control}
                      name="remember"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              id="remember"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-gray-400 data-[state=checked]:bg-[#2a8d87]"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor="remember"
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            Remember me
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <Link
                      href="forgot"
                      className="text-sm text-[#2a8d87] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-6 rounded-xl bg-gradient-to-r from-[#2a8d87] to-[#1e6d68] hover:from-[#237874] hover:to-[#165651] text-white font-medium shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                    disabled={form.formState.isSubmitting}
                  >
                    Sign in
                  </Button>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account yet?{" "}
                    <Link
                      href="register"
                      className="text-[#2a8d87] font-medium hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </Form>

              <p className="mt-10 text-xs text-center text-gray-400">
                @echoschools2022
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
