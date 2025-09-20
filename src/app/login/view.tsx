import LoginForm from "@/app/login/form";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginView() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-background to-muted/20 p-4 min-h-screen">
      <div className="top-4 right-4 absolute">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="font-bold text-2xl">Sign in</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-muted-foreground text-sm text-center">
              Demo credentials: john@example.com : Password123!
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
