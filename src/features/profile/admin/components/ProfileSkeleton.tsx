import AdminHeader from "@/components/common/AdminHeader.tsx";

export default function ProfileSkeleton() {
    return (
        <div className="min-h-screen pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <AdminHeader title={"Edit Profile"} subtitle={"Manage your public presence and bio."} />
            </div>
            
            <div className="max-w-5xl mx-auto px-4 pt-8 space-y-8 animate-pulse">
                
                {/* Identity Card Skeleton */}
                <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
                    <div className="w-1/3 h-6 bg-muted rounded mb-6"></div>
                    <div className="flex flex-col sm:flex-row gap-8">
                        <div className="w-32 h-32 rounded-full bg-muted shrink-0"></div>
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <div className="w-16 h-4 bg-muted rounded"></div>
                                <div className="w-full h-10 bg-muted rounded-md"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-16 h-4 bg-muted rounded"></div>
                                <div className="w-full h-10 bg-muted rounded-md"></div>
                            </div>
                            <div className="w-1/4 h-10 bg-muted rounded-md mt-4"></div>
                        </div>
                    </div>
                </div>

                {/* Bio Card Skeleton */}
                <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
                    <div className="w-1/3 h-6 bg-muted rounded mb-6"></div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="w-16 h-4 bg-muted rounded"></div>
                            <div className="w-full h-24 bg-muted rounded-md"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="w-24 h-4 bg-muted rounded"></div>
                            <div className="w-full h-10 bg-muted rounded-md border-dashed border-2"></div>
                        </div>
                    </div>
                </div>

                {/* Social Card Skeleton */}
                <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
                    <div className="w-1/3 h-6 bg-muted rounded mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-4 items-center">
                                <div className="w-1/3 h-10 bg-muted rounded-md"></div>
                                <div className="flex-1 h-10 bg-muted rounded-md"></div>
                                <div className="w-10 h-10 bg-muted rounded-md"></div>
                            </div>
                        ))}
                        <div className="w-32 h-10 bg-muted rounded-md mt-4"></div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
