import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Database,
  Github,
  Key,
  Lock,
  Server,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-50 dark:from-slate-900 to-blue-50 dark:to-slate-800 min-h-screen">
      {/* Header */}
      <header className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-b">
        <div className="flex justify-between items-center mx-auto px-4 py-4 container">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl">JWT Auth Demo</span>
          </div>
          <nav className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">
                <Lock className="mr-2 w-4 h-4" />
                Demo Login
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 w-4 h-4" />
                Source
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto px-4 py-16 text-center container">
        <div className="mx-auto max-w-4xl">
          <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 font-bold text-transparent text-5xl">
            Hybrid Stateful/Stateless JWT Authentication
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300 text-xl">
            A comprehensive demonstration of modern JWT authentication in
            Next.js 2025, combining the best of both stateful and stateless
            approaches for maximum security and flexibility.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Button size="lg" asChild>
              <Link href="/login">
                <Lock className="mr-2 w-5 h-5" />
                Try Live Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">
                <BookOpen className="mr-2 w-5 h-5" />
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto px-4 py-16 container">
        <h2 className="mb-12 font-bold text-3xl text-center">Key Features</h2>
        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900 mb-4 rounded-lg w-12 h-12">
                <Key className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Hybrid Authentication</CardTitle>
              <CardDescription>
                Combines stateful JTI tracking with stateless JWT verification
                for optimal security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  JWT with JTI blacklisting
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Redis-based revocation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Edge runtime support
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex justify-center items-center bg-green-100 dark:bg-green-900 mb-4 rounded-lg w-12 h-12">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Secure by Design</CardTitle>
              <CardDescription>
                Industry-standard security practices with Argon2 hashing and
                secure cookies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Argon2 password hashing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  HttpOnly secure cookies
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  CSRF protection not needed!
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex justify-center items-center bg-purple-100 dark:bg-purple-900 mb-4 rounded-lg w-12 h-12">
                <Server className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Next.js 15 Ready</CardTitle>
              <CardDescription>
                Built with the latest Next.js features including App Router and
                Server Components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  App Router architecture
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Server Actions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Non-Blocking Middleware protection
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex justify-center items-center bg-orange-100 dark:bg-orange-900 mb-4 rounded-lg w-12 h-12">
                <Database className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Redis Integration</CardTitle>
              <CardDescription>
                Lightning-fast token revocation and session management with
                Redis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Instant token revocation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Scalable session storage
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  TTL management
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex justify-center items-center bg-cyan-100 dark:bg-cyan-900 mb-4 rounded-lg w-12 h-12">
                <Lock className="w-6 h-6 text-cyan-600" />
              </div>
              <CardTitle>Production Ready</CardTitle>
              <CardDescription>
                TypeScript-first with comprehensive error handling and edge
                cases covered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Full TypeScript support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Comprehensive testing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Error boundary handling
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex justify-center items-center bg-pink-100 dark:bg-pink-900 mb-4 rounded-lg w-12 h-12">
                <BookOpen className="w-6 h-6 text-pink-600" />
              </div>
              <CardTitle>Educational Focus</CardTitle>
              <CardDescription>
                Detailed documentation and code examples for learning modern
                authentication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Step-by-step guide
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Code annotations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
                  Best practices
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technical Details */}
      <section className="mx-auto px-4 py-16 container">
        <h2 className="mb-12 font-bold text-3xl text-center">
          Technical Implementation
        </h2>
        <div className="gap-8 grid md:grid-cols-2 mx-auto max-w-4xl">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 w-5 h-5" />
                Stateful Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Immediate token revocation</li>
                <li>• Session management and tracking</li>
                <li>• User activity monitoring</li>
                <li>• Enhanced security controls</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="mr-2 w-5 h-5" />
                Stateless Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• No database lookups for validation</li>
                <li>• Horizontal scalability</li>
                <li>• Edge runtime compatibility</li>
                <li>• Reduced server load</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Demo Section */}
      <section className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-16">
        <div className="mx-auto px-4 text-center container">
          <h2 className="mb-8 font-bold text-3xl">Try the Demo</h2>
          <div className="mx-auto max-w-2xl">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Test Login Credentials</CardTitle>
                <CardDescription>
                  Use these credentials to test the authentication system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="font-mono text-sm">
                    <strong>Email:</strong> john@example.com
                    <br />
                    <strong>Password:</strong> Password123!
                  </p>
                </div>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/login">
                    <Lock className="mr-2 w-5 h-5" />
                    Start Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t">
        <div className="mx-auto px-4 py-8 text-gray-600 dark:text-gray-400 text-center container">
          <p>
            Built with Next.js 15, TypeScript, and Redis for the blog article:
          </p>
          <p className="mt-2 font-semibold">
            "Hybrid Stateful/Stateless JWT Authentication in Next.js 2025"
          </p>
        </div>
      </footer>
    </div>
  );
}
