import { createFileRoute } from "@tanstack/react-router";
import { useAppSelector } from "@/store/hooks";
import { useGetUserChannelSubscribersQuery } from "@/store/api/subscriptionApi";
import { Loader2, Users } from "lucide-react";

export const Route = createFileRoute("/_app/subscribers")({
  component: SubscribersPage,
});

function SubscribersPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetUserChannelSubscribersQuery(user?._id || "", { skip: !user?._id });
  const subscribers = data?.data?.subscribers ?? [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">Subscribers</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : subscribers.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscribers.map((s: any) => (
            <div key={s._id} className="flex items-center gap-3 bg-surface rounded-xl p-4">
              <img src={s.subscriber?.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium text-sm">{s.subscriber?.fullName}</p>
                <p className="text-xs text-muted-foreground">@{s.subscriber?.userName}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-20">No subscribers yet</p>
      )}
    </div>
  );
}
