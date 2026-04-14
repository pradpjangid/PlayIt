import { createFileRoute } from "@tanstack/react-router";
import { useAppSelector } from "@/store/hooks";
import { useGetUserPlaylistsQuery } from "@/store/api/playlistApi";
import { Loader2, ListVideo } from "lucide-react";

export const Route = createFileRoute("/_app/playlists")({
  component: PlaylistsPage,
});

function PlaylistsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetUserPlaylistsQuery(user?._id || "", { skip: !user?._id });
  const playlists = data?.data?.playlists ?? [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ListVideo className="w-6 h-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">Playlists</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : playlists.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((p: any) => (
            <div key={p._id} className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-heading font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{p.videos?.length || 0} videos</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-20">No playlists yet</p>
      )}
    </div>
  );
}
