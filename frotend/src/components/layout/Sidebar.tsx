import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  ThumbsUp,
  Clock,
  FolderOpen,
  ListVideo,
  Users,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";

interface SidebarProps {
  isOpen: boolean;
}

const publicLinks = [
  { to: "/", icon: Home, label: "Home" },
];

const authLinks = [
  { to: "/liked-videos", icon: ThumbsUp, label: "Liked Videos" },
  { to: "/history", icon: Clock, label: "History" },
  { to: "/my-content", icon: FolderOpen, label: "My Content" },
  { to: "/playlists", icon: ListVideo, label: "Playlists" },
  { to: "/subscribers", icon: Users, label: "Subscribers" },
];

const bottomLinks = [
  { to: "/settings", icon: Settings, label: "Settings" },
  { to: "/help", icon: HelpCircle, label: "Support" },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 bottom-0 z-40 bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        isOpen ? "w-56" : "w-16"
      )}
    >
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {publicLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive(link.to)
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <link.icon className={cn("w-5 h-5 shrink-0", isActive(link.to) && "text-primary")} />
            {isOpen && <span className="truncate">{link.label}</span>}
          </Link>
        ))}

        {isAuthenticated && (
          <>
            <div className={cn("my-3 mx-3 border-t border-sidebar-border", !isOpen && "mx-1")} />
            {authLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive(link.to)
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <link.icon className={cn("w-5 h-5 shrink-0", isActive(link.to) && "text-primary")} />
                {isOpen && <span className="truncate">{link.label}</span>}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="py-3 px-2 space-y-1 border-t border-sidebar-border">
        {bottomLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive(link.to)
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <link.icon className={cn("w-5 h-5 shrink-0", isActive(link.to) && "text-primary")} />
            {isOpen && <span className="truncate">{link.label}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
}
