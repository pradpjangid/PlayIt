import { createFileRoute, Link } from "@tanstack/react-router";
import { useGetVideoByIdQuery } from "@/store/api/videoApi";
import { useGetVideoCommentsQuery, useAddCommentMutation } from "@/store/api/commentApi";
import { useToggleVideoLikeMutation } from "@/store/api/likeApi";
import { useToggleSubscriptionMutation } from "@/store/api/subscriptionApi";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Share2, Loader2, Send, UserPlus, UserCheck } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/_app/watch/$videoId")({
  component: WatchPage,
});

function WatchPage() {
  const { videoId } = Route.useParams();
  const { data: videoData, isLoading } = useGetVideoByIdQuery(videoId);
  const { data: commentsData } = useGetVideoCommentsQuery({ videoId });
  const [toggleLike] = useToggleVideoLikeMutation();
  const [toggleSub] = useToggleSubscriptionMutation();
  const [addComment] = useAddCommentMutation();
  const [commentText, setCommentText] = useState("");
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const video = videoData?.data;
  const comments = commentsData?.data?.docs || commentsData?.data || [];

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      await addComment({ videoId, content: commentText }).unwrap();
      setCommentText("");
    } catch {
      // handle error
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!video) {
    return <div className="text-center py-20 text-muted-foreground">Video not found</div>;
  }

  let timeAgo = "";
  try {
    timeAgo = formatDistanceToNow(new Date(video.createdAt), { addSuffix: true });
  } catch {
    timeAgo = "";
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <div className="aspect-video rounded-2xl overflow-hidden bg-surface">
            <video
              src={video.videoFile}
              controls
              className="w-full h-full object-contain bg-black"
              poster={video.thumbnail}
              autoPlay
            />
          </div>

          {/* Video Info */}
          <div>
            <h1 className="font-heading text-xl font-bold">{video.title}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
              <div className="flex items-center gap-3">
                {video.owner && (
                  <Link to="/channel/$userName" params={{ userName: video.owner.userName }}>
                    <img
                      src={video.owner.avatar}
                      alt={video.owner.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                )}
                <div>
                  <p className="font-medium text-sm">{video.owner?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{video.views} views • {timeAgo}</p>
                </div>
                {isAuthenticated && video.owner && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full ml-3"
                    onClick={() => toggleSub(video.owner._id)}
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Subscribe
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isAuthenticated && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full"
                    onClick={() => toggleLike(videoId)}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Like
                  </Button>
                )}
                <Button variant="secondary" size="sm" className="rounded-full">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 bg-surface rounded-xl p-4">
              <p className="text-sm text-surface-foreground whitespace-pre-wrap">
                {video.description}
              </p>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-lg">Comments</h2>
            {isAuthenticated && (
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  className="flex-1 h-10 bg-surface rounded-full px-4 text-sm border border-border focus:border-primary focus:outline-none"
                />
                <Button size="icon" className="rounded-full" onClick={handleAddComment}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
            <div className="space-y-3">
              {comments.map((comment: any) => (
                <div key={comment._id} className="flex gap-3 p-3 rounded-xl bg-surface">
                  <img
                    src={comment.owner?.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="text-sm font-medium">{comment.owner?.fullName}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{comment.content}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">No comments yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar - related could go here */}
        <div className="hidden lg:block">
          <h3 className="font-heading font-bold mb-4">Up Next</h3>
          <p className="text-sm text-muted-foreground">Related videos will appear here</p>
        </div>
      </div>
    </div>
  );
}
