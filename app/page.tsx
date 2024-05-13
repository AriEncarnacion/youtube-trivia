import VideoLinkForm from "@/components/VideoLinkForm";

export default function Home() {
  //TODO: add userkey to db and grab for session

  return (
    <div className="grid place-items-center text-slate-900 dark:text-slate-200">
      <VideoLinkForm />
    </div>
  );
}
