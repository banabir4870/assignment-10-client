"use client";

import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  Button,
  Select,
} from "@heroui/react";

import { Check } from "@gravity-ui/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const UserData = Object.fromEntries(formData.entries());

    if (UserData.password !== UserData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const {data, error} = await authClient.signUp.email({
        name: UserData.name,
        email: UserData.email,
        password: UserData.password,
        role: UserData.role,
        plan: "free",
        callbackUrl: "/",
    })

    if(data) {
        alert("Registration successful!");
        redirect("/");
    }
    if(error) {
        alert("Registration failed: " + error);
    }

    console.log("Form Data:", UserData);

  };

  const handleGoogleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">

      <div className="w-full max-w-md bg-[#1E293B] p-8 rounded-2xl border border-white/10 my-10">

        <h2 className="text-2xl font-bold text-white text-center">
          Create <span className="text-[#C9A65B]">Account</span>
        </h2>
        <p className="text-sm text-gray-400 text-center mt-2">
          Join Legal<span className="text-white">Ease</span> and connect with top lawyers today!
        </p>

        <Form className="flex flex-col gap-4 mt-6" onSubmit={onSubmit}>

          <TextField isRequired name="name">
            <Label className="text-white">Full Name</Label>
            <Input placeholder="Enter Your Full Name" />
            <FieldError />
          </TextField>

          <TextField isRequired name="email" type="email">
            <Label className="text-white">Email</Label>
            <Input placeholder="Enter Your Email" />
            <FieldError />
          </TextField>

          <TextField isRequired name="password" type="password">
            <Label className="text-white">Password</Label>
            <Input placeholder="Enter Your Password" />
            <FieldError />
          </TextField>

          <TextField isRequired name="confirmPassword" type="password">
            <Label className="text-white">Confirm Password</Label>
            <Input placeholder="Confirm Your Password" />
            <FieldError />
          </TextField>

          {/* ✅ FIXED ROLE SELECT (NO SelectItem) */}
          <div className="flex flex-col gap-2">
            <Label className="text-white">Select Role</Label>

            <select
              name="role"
              defaultValue="user"
              className="w-full px-4 py-3 rounded-lg bg-white text-black border border-white/10 outline-none focus:border-[#C9A65B]"
            >
              <option value="user">User (Client)</option>
              <option value="lawyer">Lawyer</option>
            </select>
          </div>

          <Button type="submit" className="bg-[#C9A65B] text-lg text-white w-full hover:bg-[#ab8635] transition">
             Register
          </Button>

        </Form>

        {/* OR */}
        <div className="my-5 text-center text-gray-400">OR</div>

        {/* Google Login */}
        <Button
          variant="secondary"
          className="w-full text-lg hover:bg-[#ab8635] hover:text-white transition"
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>

        <p className="text-sm text-gray-400 text-center mt-5">
          Already have account?{" "}
          <Link href="/auth/login" className="text-[#C9A65B]">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}