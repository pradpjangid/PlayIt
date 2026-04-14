import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Menu, Upload, Bell, User } from "lucide-react";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { useLogoutMutation } from "@/store/api/authApi";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logoutApi] = useLogoutMutation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/", search: { query: searchQuery } });
    }
  };
  console.log('user', user)
  const handleLogout = async () => {
    try {
      await logoutApi(undefined).unwrap();
    } catch {
      // ignore
    }
    dispatch(logout());
    setShowUserMenu(false);
    navigate({ to: "/" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 glass-surface flex items-center px-4 gap-4">
      <button onClick={onMenuToggle} className="p-2 rounded-lg hover:bg-secondary transition-colors">
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      <Link to="/" className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg gradient-aurora flex items-center justify-center">
          <span className="font-heading font-bold text-sm text-background">▶</span>
        </div>
        <span className="font-heading font-bold text-lg hidden sm:block gradient-aurora-text">PlayIT</span>
      </Link>

      <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-surface rounded-l-full px-4 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors"
          />
          <button type="submit" className="h-9 px-5 bg-secondary rounded-r-full border border-l-0 border-border hover:bg-muted transition-colors">
            <Search className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2 shrink-0">
        {isAuthenticated ? (
          <>
            <Link to="/upload" className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Upload className="w-5 h-5 text-foreground" />
            </Link>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-colors"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-accent flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-10 w-48 bg-popover rounded-lg border border-border shadow-xl py-1 z-50">
                  <Link
                    to="/channel/$userName"
                    params={{ userName: user?.userName || "" }}
                    className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Your Channel
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Settings
                  </Link>
                  <hr className="border-border my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="rounded-full">Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
