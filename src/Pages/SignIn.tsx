import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/store/authStore"
import { signInUser } from "@/lib/ctb"
import { useNavigate } from "react-router-dom"
import toastr from "toastr"
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: true,
  timeOut: 2500,
  extendedTimeOut: 1000,
  progressBar: true,
  positionClass: 'toast-bottom-right',
  newestOnTop: true,
  showEasing: 'swing',   // ✅ valid easing
  hideEasing: 'swing',   // ✅ valid easing
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
  toastClass: 'bg-card text-foreground shadow-lg border border-border rounded-xl p-4 font-medium',
  titleClass: 'text-lg font-semibold',
  messageClass: 'text-sm',
}

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 6 characters.",
  }),
})

export function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    try {
      await signInUser({...values})
      form.reset()
      console.log("navigating to home, user logged in successfully")
      navigate("/home")
      toastr.success("User signed in successfully!","Success")
    } catch (error) {
      console.log("error", error)
      //show toast
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} />
                  </FormControl>
                  <FormDescription>This should be your registered email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} type="password"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
