import { createFileRoute } from "@tanstack/react-router";
import { useGetChannelStatsQuery, useGetChannelVideosQuery } from "@/store/api/dashboardApi";
import { Loader2, Eye, Users, Video, ThumbsUp } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { data: statsData, isLoading: statsLoading } = useGetChannelStatsQuery(undefined);
  const { data: videosData, isLoading: videosLoading } = useGetChannelVideosQuery(undefined);

  const stats = statsData?.data;
  const videos = videosData?.data || [];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-heading text-2xl font-bold mb-6 gradient-aurora-text">Channel Dashboard</h1>

      {statsLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Eye} label="Total Views" value={stats.totalViews || 0} />
          <StatCard icon={Users} label="Subscribers" value={stats.totalSubscribers || 0} />
          <StatCard icon={Video} label="Total Videos" value={stats.totalVideos || 0} />
          <StatCard icon={ThumbsUp} label="Total Likes" value={stats.totalLikes || 0} />
        </div>
      ) : null}

      <h2 className="font-heading text-lg font-bold mb-4">Your Videos</h2>
      {videosLoading ? (
        <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
      ) : videos.length ? (
        <div className="space-y-3">
          {videos.map((v: any) => (
            <div key={v._id} className="flex gap-4 bg-surface rounded-xl p-4">
              <img src={v.thumbnail} alt="" className="w-40 h-24 rounded-lg object-cover shrink-0" />
              <div className="min-w-0">
                <h3 className="font-medium text-sm truncate">{v.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{v.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{v.views} views</span>
                  <span>{v.isPublished ? "Published" : "Draft"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">No videos uploaded yet</p>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: number }) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-heading font-bold">{value.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}
