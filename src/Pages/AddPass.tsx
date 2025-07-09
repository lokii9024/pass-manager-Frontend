import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { encryptPass } from "@/lib/encryption";
import { addPass, getAllPasses } from "@/lib/ctb";
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
  url: z.string().min(2, {
    message: "URL is required",
  }),
  username: z.string().min(2, {
    message: "Username is required",
  }),
  pass: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  master_pass: z.string().min(8, {
    message: "Master Password must be at least 8 characters",
  }),
});

const AddPass = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      username: "",
      pass: "",
      master_pass: "",
    },
  });

  const [open, setOpen] = React.useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const {encrypted,IV} = encryptPass({pass:values.pass,master_pass: values.master_pass})
  
      const newPass = await addPass({
        url:values.url,
        username: values.username,
        pass: encrypted,
        IV: IV,
      });

      console.log("Password added successfully:", newPass);
      toastr.success("Password added successfully!","Success")
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding password:", error);
      toastr.error("Error while adding password!","Error")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Add your password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the URL" {...field} type="text" />
                  </FormControl>
                  <FormDescription>
                    This should be the URL of the site for which you are storing the password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Username" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="master_pass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Master Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Master Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Collapsible Guidelines */}
            <Collapsible open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex justify-between items-center"
                >
                  Master Password Guidelines
                  {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded-md text-sm text-yellow-900 space-y-1">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use the same <strong>strong</strong> master password for all entries.</li>
                    <li>Double-check your master password before submitting.</li>
                    <li>Never share your master password with anyone.</li>
                    <li>Without the master password, even we cannot decrypt your stored passwords.</li>
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddPass;
