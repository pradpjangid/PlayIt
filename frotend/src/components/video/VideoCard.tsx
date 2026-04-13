import { Link } from "@tanstack/react-router";
import { Eye, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface VideoCardProps {
  video: {
    _id: string;
    title: string;
    thumbnail: string;
    duration: number;
    views: number;
    createdAt: string;
    owner?: {
      _id: string;
      userName: string;
      fullName: string;
      avatar: string;
    };
  };
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatViews(views: number) {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return views.toString();
}

export function VideoCard({ video }: VideoCardProps) {
  let timeAgo = "";
  try {
    timeAgo = formatDistanceToNow(new Date(video.createdAt), { addSuffix: true });
  } catch {
    timeAgo = "";
  }

  return (
    <Link to="/watch/$videoId" params={{ videoId: video._id }} className="group block">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-surface">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 bg-background/90 text-foreground text-xs font-medium px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </span>
      </div>
      <div className="flex gap-3 mt-3">
        {video.owner && (
          <Link
            to="/channel/$userName"
            params={{ userName: video.owner.userName }}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0"
          >
            <img
              src={video.owner.avatar}
              alt={video.owner.fullName}
              className="w-9 h-9 rounded-full object-cover"
            />
          </Link>
        )}
        <div className="min-w-0">
          <h3 className="font-heading font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          {video.owner && (
            <p className="text-xs text-muted-foreground mt-1">{video.owner.fullName}</p>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(video.views)} views
            </span>
            {timeAgo && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {timeAgo}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
