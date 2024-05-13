import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonQuiz() {
  const SkeletonOption = () => {
    return (
      <div className="grid grid-cols-subgrid gap-2 grid-cols-12 m-5 place-content-center">
        <div className="col-span-1 rounded-full h-2 w-2 bg-slate-300 dark:bg-slate-500" />
        <div className="col-start-2 rounded-full h-2 w-36 md:w-96 lg:w-96 bg-slate-300 dark:bg-slate-600" />
      </div>
    );
  };

  const SkeletonButton = () => {
    return <div className="w-12 h-6 bg-slate-400 dark:bg-slate-900 rounded" />;
  };

  const SkeletonOptionSet = () => {
    return (
      <div className="w-5/6 p-5">
        <SkeletonOption />
        <SkeletonOption />
        <SkeletonOption />

        <SkeletonButton />
      </div>
    );
  };

  const SkeletonQuestion = () => {
    return (
      <p className="text-lg text-slate-400 dark:text-slate-600 ml-5">
        ... ... ... ... ... ... ... ... ?
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-y-5">
      <Skeleton className="p-10 bg-slate-200 dark:bg-slate-800">
        <h1 className="text-center text-slate-400 dark:text-slate-500 text-xl font-bold mb-5">
          Loading your quiz...
        </h1>
        <SkeletonQuestion />
        <SkeletonOptionSet />

        <SkeletonQuestion />
        <SkeletonOptionSet />

        <SkeletonQuestion />
        <SkeletonOptionSet />
      </Skeleton>
    </div>
  );
}
