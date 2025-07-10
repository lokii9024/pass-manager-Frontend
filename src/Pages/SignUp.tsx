import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
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
import { signUpUser } from "@/lib/ctb"
import { useAuthStore } from "@/store/authStore"
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
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
})

export function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically call your sign-up API
    // For example:
    // signUpUser(values)
    console.log("Form submitted with values:", values)
    try {
      await signUpUser({...values})
      form.reset()
      navigate("/home") // Redirect to home page after successful sign-up
      toastr.success("User created successfully!","Success")
    } catch (error:any) {
      // Handle error appropriately
      console.error("Error during sign-up:", error)
      //show toast
      switch (error.status) {
        case 400:
          toastr.error("User already exist, Please sign in !!","Error")
          break;
        
        case 500:
            toastr.error("Internal server error","Error")
            break
        default:
          toastr.error("Sign Up failed","Unexpected Error")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
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
                    <Input placeholder="Enter your password" type="password" {...field} />
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
