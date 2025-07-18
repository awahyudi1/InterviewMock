"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/formField";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
	return z.object({
		name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
		email: z.string().email(),
		password: z.string().min(3),
	});
};

const AuthForm = ({ type }: { type: FormType }) => {
	const router = useRouter();
	const formSchema = authFormSchema(type);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	// 2. Define a submit handler.
	const isSignIn = type === "sign-in";
	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (type === "sign-up") {
				toast.success("Sign up successful!");
				router.push("/sign-in");
			} else {
				toast.success("Sign in successful!");
				router.push("/");
			}
		} catch (error) {
			console.log(error);
			toast.error(`An error occurred: ${error}`);
		}
	}

	return (
		<div className="card-border lg:min-w-[566px]">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<div className="flex flex-row gap-2 justify-center">
					<Image src="/logo.svg" alt="logo" width={38} height={32} />
					<h2 className="text-primary-100">PrepWise</h2>
				</div>
				<h3> Practice Jobs Interview With AI</h3>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-6 mt-4 form "
					>
						{!isSignIn && (
							<FormField
								control={form.control}
								name="name"
								label="Name"
								placeholder="Your Name"
							/>
						)}
						<FormField
							control={form.control}
							name="email"
							label="Email"
							placeholder="Your Email Address"
							type="email"
						/>
						<FormField
							control={form.control}
							name="password"
							label="Password"
							placeholder="Enter Your Password"
							type="password"
						/>

						<Button className="btn" type="submit">
							{isSignIn ? "Sign In" : "Create An Account"}
						</Button>
					</form>
				</Form>

				<p className="text-center">
					{isSignIn ? "Don't have an account?" : "Already have an account?"}
					<Link
						href={!isSignIn ? "/sign-in" : "/sign-up"}
						className="font-bold text-user-primary ml-1"
					>
						{!isSignIn ? "Sign In" : "Sign Up"}
					</Link>
				</p>
			</div>
		</div>
	);
};
export default AuthForm;
