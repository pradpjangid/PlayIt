import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { usePublishVideoMutation } from "@/store/api/videoApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/upload")({
  component: UploadPage,
});

function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [publishVideo, { isLoading }] = usePublishVideoMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnail) {
      setErrorMsg("Video and thumbnail are required");
      return;
    }
    setErrorMsg("");
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("videoFile", videoFile);
      fd.append("thumbnail", thumbnail);
      await publishVideo(fd).unwrap();
      navigate({ to: "/my-content" });
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Upload failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Upload className="w-6 h-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">Upload Video</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl border border-border space-y-4">
        {errorMsg && (
          <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg">
            {errorMsg}
          </div>
        )}
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Video title" />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Describe your video" rows={4} />
        </div>
        <div className="space-y-2">
          <Label>Video File</Label>
          <Input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} required />
        </div>
        <div className="space-y-2">
          <Label>Thumbnail</Label>
          <Input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} required />
        </div>
        <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Upload Video
        </Button>
      </form>
    </div>
  );
}
