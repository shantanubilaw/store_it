import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ChartExample from "@/components/ChartExample";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <Image
            className="mx-auto mb-6 dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={150}
            height={30}
            priority
          />
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Store It
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Chart.js & Appwrite
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Next.js 16</CardTitle>
              <CardDescription>React Framework with App Router</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Server-side rendering, static generation, and powerful routing capabilities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>TypeScript</CardTitle>
              <CardDescription>Type-safe development</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Enhanced code quality with static type checking and IntelliSense.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tailwind CSS</CardTitle>
              <CardDescription>Utility-first CSS framework</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Rapidly build modern websites without leaving your HTML.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui</CardTitle>
              <CardDescription>Beautiful UI components</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Accessible and customizable components built with Radix UI.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chart.js</CardTitle>
              <CardDescription>Data visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Simple yet flexible JavaScript charting library.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appwrite</CardTitle>
              <CardDescription>Backend as a Service</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Secure authentication, databases, storage, and serverless functions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Demo */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Chart.js Example</CardTitle>
            <CardDescription>Interactive data visualization with react-chartjs-2</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartExample />
          </CardContent>
        </Card>

        {/* Interactive Demo */}
        <Card>
          <CardHeader>
            <CardTitle>shadcn/ui Components Demo</CardTitle>
            <CardDescription>Try out the UI components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Sample Input</label>
              <Input placeholder="Type something..." />
            </div>
            <div className="flex gap-2">
              <Button>Primary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>Configure Appwrite in .env.local file to connect your backend</p>
          <Image
            className="mx-auto mt-4 dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={100}
            height={20}
          />
        </div>
      </main>
    </div>
  );
}
