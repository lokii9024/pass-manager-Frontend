import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { usePassStore } from "@/store/passStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { EditPassEntry } from "@/lib/ctb";
import { encryptPass } from "@/lib/encryption";

toastr.options = {
  closeButton: true,
  timeOut: 2500,
  extendedTimeOut: 1000,
  progressBar: true,
  positionClass: "toast-bottom-right",
  newestOnTop: true,
  showEasing: "swing", // ✅ valid easing
  hideEasing: "swing", // ✅ valid easing
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
  toastClass:
    "bg-card text-foreground shadow-lg border border-border rounded-xl p-4 font-medium",
  titleClass: "text-lg font-semibold",
  messageClass: "text-sm",
};

const formSchema = z.object({
  url: z.string().min(1), // disabled but required for display
  username: z.string().min(2, { message: "Username is required" }),
  pass: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  master_pass: z
    .string()
    .min(8, { message: "Master Password must be at least 8 characters" }),
});

export default function EditPass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { passes,updatePass } = usePassStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      username: "",
      pass: "",
      master_pass: "",
    },
  });

  const selectedPass = passes.find((p) => p._id === id);

  useEffect(() => {
    if (selectedPass) {
      form.setValue("url", selectedPass.url);
      form.setValue("username", selectedPass.username);
    }
  }, [selectedPass]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { encrypted, IV } = encryptPass({
        pass: values.pass,
        master_pass: values.master_pass,
      });

      const updatedPass = await EditPassEntry({
        url: values.url,
        username: values.username,
        pass: encrypted,
        IV: IV,
        id: id ?? ""
      })

      updatePass(id ?? "",updatedPass)
      toastr.success("Password updated successfully!", "Success");
      navigate(-1); // Go back to dashboard
    } catch (error) {
      console.error(error);
      toastr.error("Update failed. Try again.", "Error");
    }finally{
      form.reset()
    }
  };

  if (!selectedPass) {
    return (
      <div className="text-center mt-10 text-lg">Pass entry not found</div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Password</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
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
                    <Input placeholder="Update username" {...field} />
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
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
                      type="password"
                      placeholder="Confirm with master password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Update Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
