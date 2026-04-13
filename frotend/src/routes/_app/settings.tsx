import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useChangePasswordMutation, useUpdateAccountMutation } from "@/store/api/authApi";
import { setUser } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Loader2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [updateAccount, { isLoading: updating }] = useUpdateAccountMutation();
  const [changePassword, { isLoading: changingPw }] = useChangePasswordMutation();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await updateAccount({ fullName, email }).unwrap();
      if (res.data) dispatch(setUser(res.data));
      setMsg("Account updated!");
    } catch {
      setMsg("Failed to update.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      setMsg("Password changed!");
      setOldPassword("");
      setNewPassword("");
    } catch {
      setMsg("Failed to change password.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">Settings</h1>
      </div>

      {msg && (
        <div className="bg-primary/10 text-primary text-sm px-4 py-3 rounded-lg mb-4">{msg}</div>
      )}

      <div className="space-y-8">
        <form onSubmit={handleUpdateAccount} className="bg-card p-6 rounded-2xl border border-border space-y-4">
          <h2 className="font-heading font-bold">Account Details</h2>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button type="submit" className="rounded-full" disabled={updating}>
            {updating && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Save Changes
          </Button>
        </form>

        <form onSubmit={handleChangePassword} className="bg-card p-6 rounded-2xl border border-border space-y-4">
          <h2 className="font-heading font-bold">Change Password</h2>
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="rounded-full" disabled={changingPw}>
            {changingPw && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
}
