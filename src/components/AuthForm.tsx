"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type FormType = "sign-in" | "sign-up"

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email("Please enter a valid email address"),
    fullName:
      formType === "sign-up"
        ? z.string().min(2, "Name must be at least 2 characters").max(50)
        : z.string().optional(),
  })
}

interface AuthFormProps {
  type: FormType
}

export default function AuthForm({ type }: AuthFormProps) {
  const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast(`${type === "sign-in" ? "Signing in" : "Signing up"}...`, {
      description: "Please wait while we process your request.",
      position: "bottom-right",
    })
    console.log(data)
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="auth-form">{type === "sign-in" ? "Sign In" : "Sign Up"}</CardTitle>
        <CardDescription>
          {type === "sign-in"
            ? "Enter your credentials to access your account"
            : "Create a new account to get started"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {type === "sign-up" && (
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="fullName"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full">
              {type === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
          </FieldGroup>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="text-primary hover:underline font-medium"
              >
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}