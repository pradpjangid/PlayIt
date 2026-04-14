import { createFileRoute } from "@tanstack/react-router";
import { useGetAllVideosQuery } from "@/store/api/videoApi";
import { VideoCard } from "@/components/video/VideoCard";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

function HomePage() {
  const { data, isLoading, error } = useGetAllVideosQuery({});

  const videos = data?.data?.videos ?? [];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6 gradient-aurora-text">Discover</h1>
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      {error && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Failed to load videos. Please try again.</p>
        </div>
      )}
      {!isLoading && videos.length === 0 && !error && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No videos found. Be the first to upload!</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {videos.map((video: any) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
