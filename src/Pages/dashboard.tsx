import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { usePassStore } from "@/store/passStore";
import { useEffect, useState } from "react";
import { removePass } from "@/lib/ctb";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { usePassesInit } from "@/hooks/usePassesInit";
import PassLayout from "../components/passLayout";
import { decryptPass } from "@/lib/encryption";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Pass } from "../store/passStore";

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

const Dashboard = () => {
  const { User } = useAuthStore.getState();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { passes } = usePassStore.getState();

  const [showDialog, setShowDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Pass | null>(null);
  const [masterPassInput, setMasterPassInput] = useState("");
  const [revealedPass, setRevealedPass] = useState("");
  const [error, setError] = useState("");

  usePassesInit();
  useEffect(() => console.log(passes), [passes]);

  const handleDelete = async (id: string) => {
    try {
      await removePass(id);
      console.log("Pass deleted successfully!");
      toastr.success("Pass deleted successfully!", "Success");
    } catch (error) {
      console.log("Errot while deleting pass", error);
      toastr.error("Something went wrong!!", "Error");
    }
  };

  const handleEyeClick = (entry: any) => {
    setSelectedEntry(entry);
    setMasterPassInput("");
    setRevealedPass("");
    setError("");
    setShowDialog(true);
  };

  const handleVerify = () => {
    if (!selectedEntry) {
      setError("No entry selected.");
      return;
    }
    try {
      const decrypted = decryptPass(
        selectedEntry.pass,
        selectedEntry.IV,
        masterPassInput
      );

      if (!decrypted) {
        setError("Incorrect Master Password.");
      } else {
        setRevealedPass(decrypted);
        setError("");
      }
    } catch {
      setError("Incorrect Master Password.");
    }
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-semibold">Welcome, {User?.name}</h1>
        <Button onClick={() => navigate(`/dashboard/${slug}/add-pass`)}>
          Add New Password
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Saved Passwords</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <PassLayout>
            <table className="w-full table-auto text-sm border border-border rounded-md">
              <thead className="bg-muted">
                <tr className="text-left">
                  <th className="px-4 py-3 border">URL</th>
                  <th className="px-4 py-3 border">Username</th>
                  <th className="px-4 py-3 border">Password</th>
                  <th className="px-4 py-3 border text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {passes.length > 0 ? (
                  passes.map((entry) => (
                    <tr key={entry._id} className="border-t">
                      <td className="px-4 py-2 break-words">{entry.url}</td>
                      <td className="px-4 py-2">{entry.username}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[150px]">
                            {entry.pass}
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEyeClick(entry)} // your function here
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                Reveal Password
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <Dialog
                            open={showDialog}
                            onOpenChange={setShowDialog}
                          >
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Enter Master Password</DialogTitle>
                              </DialogHeader>

                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <Label>Master Password</Label>
                                  <Input
                                    type="password"
                                    value={masterPassInput}
                                    onChange={(e) =>
                                      setMasterPassInput(e.target.value)
                                    }
                                  />
                                </div>

                                {error && (
                                  <p className="text-destructive text-sm">
                                    {error}
                                  </p>
                                )}

                                <Button onClick={handleVerify}>Reveal</Button>

                                {revealedPass && (
                                  <div className="bg-muted p-2 rounded mt-4">
                                    <Label>Decrypted Password:</Label>
                                    <p className="font-mono">{revealedPass}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/dashboard/${slug}/update-pass/${entry._id}`
                            )
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this password?"
                              )
                            ) {
                              handleDelete(entry._id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </PassLayout>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
