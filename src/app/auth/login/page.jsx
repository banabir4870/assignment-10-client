"use client";

import {
    Form,
    TextField,
    Input,
    Label,
    FieldError,
    Button,
} from "@heroui/react";

import { Check } from "@gravity-ui/icons";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log("Form Data:", data);

        const {data: signInData, error} = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackUrl: "/",
        })

        if(signInData) {
            alert("Login successful!");
        }
        if(error) {
            alert("Login failed: " + error);
        }
    };

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">

                <div className="w-full max-w-md bg-[#1E293B] p-8 rounded-2xl border border-white/10 my-10">

                    <h2 className="text-2xl font-bold text-white text-center">
                        Login to <span className="text-[#C9A65B]">Legal<span className="text-white">Ease</span></span>
                    </h2>

                    <Form className="flex flex-col gap-4 mt-6" onSubmit={onSubmit}>

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

                        <Button type="submit" className="bg-[#C9A65B] text-lg text-white w-full hover:bg-[#ab8635] transition">
                            <Check /> Login
                        </Button>

                    </Form>

                    <div className="my-5 text-center text-gray-400">OR</div>

                    <Button
                        variant="secondary"
                        className="w-full text-lg hover:bg-[#ab8635] hover:text-white transition"
                        onClick={() => signIn("google")}
                    >
                        Continue with Google
                    </Button>

                    <p className="text-sm text-gray-400 text-center mt-5">
                        Don’t have account?{" "}
                        <Link href="/auth/register" className="text-[#C9A65B]">
                            Register
                        </Link>
                    </p>

                </div>
            </div>
        );
    }