import {motion} from "framer-motion";

interface ProjectCardSkeletonProps {
    index: number;
}

export default function ProjectCardSkeleton({
    index,
}: ProjectCardSkeletonProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col overflow-hidden rounded-2xl bg-lara-dark-blue border border-lara-border h-full"
        >
            {/* Thumbnail Skeleton */}
            <div className="aspect-video bg-slate-800 animate-pulse" />

            {/* Content Skeleton */}
            <div className="flex flex-1 flex-col p-5 space-y-4">
                {/* Tags Skeleton */}
                <div className="flex gap-2">
                    <div className="h-5 bg-slate-700 rounded animate-pulse w-12" />
                    <div className="h-5 bg-slate-700 rounded animate-pulse w-16" />
                </div>

                {/* Title Skeleton */}
                <div className="space-y-2">
                    <div className="h-6 bg-slate-700 rounded animate-pulse w-3/4" />
                    <div className="h-6 bg-slate-700 rounded animate-pulse w-1/2" />
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-slate-700 rounded animate-pulse w-full" />
                    <div className="h-4 bg-slate-700 rounded animate-pulse w-5/6" />
                </div>

                {/* Footer Skeleton */}
                <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
                    <div className="h-3 bg-slate-700 rounded animate-pulse w-20" />
                    <div className="flex gap-2">
                        <div className="h-7 bg-slate-700 rounded animate-pulse w-16" />
                        <div className="h-7 bg-slate-700 rounded animate-pulse w-20" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
