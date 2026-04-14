import { createFileRoute } from "@tanstack/react-router";
import { useGetChannelProfileQuery } from "@/store/api/authApi";
import { useGetUserTweetsQuery } from "@/store/api/tweetApi";
import { useGetSubscribedChannelsQuery } from "@/store/api/subscriptionApi";
import { useGetAllVideosQuery } from "@/store/api/videoApi";
import { useToggleSubscriptionMutation } from "@/store/api/subscriptionApi";
import { useAppSelector } from "@/store/hooks";
import { VideoCard } from "@/components/video/VideoCard";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/channel/$userName")({
  component: ChannelPage,
});

type Tab = "videos" | "playlists" | "tweets" | "following";

function ChannelPage() {
  const { userName } = Route.useParams();
  const { data: channelData, isLoading } = useGetChannelProfileQuery(userName);
  const [activeTab, setActiveTab] = useState<Tab>("videos");
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [toggleSub] = useToggleSubscriptionMutation();

  const channel = channelData?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!channel) {
    return <div className="text-center py-20 text-muted-foreground">Channel not found</div>;
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "videos", label: "Videos" },
    { key: "playlists", label: "Playlists" },
    { key: "tweets", label: "Tweets" },
    { key: "following", label: "Following" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Cover Image */}
      <div className="h-48 md:h-56 rounded-2xl overflow-hidden bg-surface">
        {channel.coverImage ? (
          <img src={channel.coverImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full gradient-aurora" />
        )}
      </div>

      {/* Profile Info */}
      <div className="flex flex-wrap items-end gap-4 -mt-10 px-4 relative z-10">
        <img
          src={channel.avatar}
          alt={channel.fullName}
          className="w-24 h-24 rounded-full border-4 border-background object-cover"
        />
        <div className="flex-1 pb-2">
          <h1 className="font-heading text-2xl font-bold">{channel.fullName}</h1>
          <p className="text-muted-foreground text-sm">@{channel.userName}</p>
          <p className="text-muted-foreground text-sm mt-1">
            {channel.subscribersCount || 0} Subscribers • {channel.channelsSubscribedToCount || 0} Subscribed
          </p>
        </div>
        {isAuthenticated && (
          <Button
            className="rounded-full"
            variant={channel.isSubscribed ? "secondary" : "default"}
            onClick={() => toggleSub(channel._id)}
          >
            <UserPlus className="w-4 h-4 mr-1" />
            {channel.isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mt-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors border-b-2",
              activeTab === tab.key
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "videos" && <ChannelVideos userId={channel._id} />}
        {activeTab === "tweets" && <ChannelTweets userId={channel._id} />}
        {activeTab === "following" && <ChannelFollowing channelId={channel._id} />}
        {activeTab === "playlists" && (
          <p className="text-muted-foreground text-center py-10">Playlists coming soon</p>
        )}
      </div>
    </div>
  );
}

function ChannelVideos({ userId }: { userId: string }) {
  const { data, isLoading } = useGetAllVideosQuery({ userId });
  const videos = data?.data?.videos ?? [];

  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  return videos.length ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {videos.map((v: any) => <VideoCard key={v._id} video={v} />)}
    </div>
  ) : (
    <p className="text-muted-foreground text-center py-10">No videos yet</p>
  );
}

function ChannelTweets({ userId }: { userId: string }) {
  const { data, isLoading } = useGetUserTweetsQuery(userId);
  const tweets = data?.data?.tweets ?? [];

  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  return tweets.length ? (
    <div className="space-y-3 max-w-2xl">
      {tweets.map((tweet: any) => (
        <div key={tweet._id} className="bg-surface rounded-xl p-4">
          <p className="text-sm">{tweet.content}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(tweet.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-muted-foreground text-center py-10">No tweets yet</p>
  );
}

function ChannelFollowing({ channelId }: { channelId: string }) {
  const { data, isLoading } = useGetSubscribedChannelsQuery(channelId);
  const channels = data?.data?.channels ?? [];

  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  return channels.length ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {channels.map((ch: any) => (
        <div key={ch._id} className="flex items-center gap-3 bg-surface rounded-xl p-4">
          <img src={ch.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-medium text-sm">{ch.fullName || ch.userName}</p>
            <p className="text-xs text-muted-foreground">@{ch.userName}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-muted-foreground text-center py-10">Not following anyone yet</p>
  );
}
