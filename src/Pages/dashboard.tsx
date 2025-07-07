import { useAuthStore } from '@/store/authStore';
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  useParams,useNavigate } from 'react-router-dom';

const entries = [
  {
    "_id": "1",
    "url": "https://gmail.com",
    "username": "johndoe@gmail.com",
    "pass": "encryptedPass123",
    "IV": "abc123iv",
    "userId": "user_1"
  },
  {
    "_id": "2",
    "url": "https://github.com",
    "username": "john_dev",
    "pass": "encryptedGHpass456",
    "IV": "def456iv",
    "userId": "user_1"
  },
  {
    "_id": "3",
    "url": "https://linkedin.com",
    "username": "john.professional",
    "pass": "encryptedLinkedin789",
    "IV": "ghi789iv",
    "userId": "user_1"
  },
  {
    "_id": "4",
    "url": "https://facebook.com",
    "username": "john.fb",
    "pass": "encryptedFBpass001",
    "IV": "jkl012iv",
    "userId": "user_1"
  }
]


const Dashboard = () => {
    const { User } = useAuthStore.getState();
    const navigate = useNavigate()
    const { slug } = useParams();
    return (
    <div className="px-4 py-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-semibold">Welcome, {User?.name}</h1>
        <Button onClick={() => navigate(`/dashboard/${slug}/add-pass`)}>Add New Password</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Saved Passwords</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
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
              {entries.length > 0 ? (
                entries.map((entry, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 break-words">{entry.url}</td>
                    <td className="px-4 py-2">{entry.username}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[150px]">{entry.pass}</span>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-muted-foreground">
                    No entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard