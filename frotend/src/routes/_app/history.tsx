import { createFileRoute } from "@tanstack/react-router";
import { useGetWatchHistoryQuery } from "@/store/api/authApi";
import { VideoCard } from "@/components/video/VideoCard";
import { Loader2, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const { data, isLoading } = useGetWatchHistoryQuery(undefined);
  const videos = data?.data?.videos ?? [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">Watch History</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : videos.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {videos.map((v: any) => (
            <VideoCard key={v._id} video={v} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-20">No watch history</p>
      )}
    </div>
  );
}
