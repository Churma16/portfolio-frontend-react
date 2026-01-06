import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiPlus, HiTrash } from "react-icons/hi2";

interface SocialCardProps {
    socials: { [key: string]: string };
    onAddSocial: () => void;
    onRemoveSocial: (platform: string) => void;
    onUpdatePlatform: (oldKey: string, newKey: string) => void;
    onUpdateUrl: (platform: string, url: string) => void;
}

export default function SocialCard({
    socials,
    onAddSocial,
    onRemoveSocial,
    onUpdatePlatform,
    onUpdateUrl,
}: SocialCardProps) {
    return (
        <Card className="bg-card-bg-lara-admin border-card-border-lara-admin text-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-heading">
                        Social Presence
                    </CardTitle>
                    <CardDescription>
                        Links to your professional networks.
                    </CardDescription>
                </div>
                <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={onAddSocial}
                    className="gap-2 text-lara-blue hover:bg-lara-blue/10"
                >
                    <HiPlus className="w-4 h-4" /> Add Platform
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {Object.entries(socials).map(([platform, url], idx) => (
                    <div key={idx} className="flex gap-3 items-center group">
                        {/* Platform Key Input */}
                        <div className="w-1/3 max-w-[200px]">
                            <Input
                                placeholder="Platform (e.g. twitter)"
                                value={platform}
                                onChange={(e) =>
                                    onUpdatePlatform(platform, e.target.value)
                                }
                                className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                            />
                        </div>
                        {/* URL Value Input */}
                        <div className="flex-1">
                            <Input
                                placeholder="https://..."
                                value={url}
                                onChange={(e) =>
                                    onUpdateUrl(platform, e.target.value)
                                }
                                className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                            />
                        </div>
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => onRemoveSocial(platform)}
                            className="text-lara-sky/60 hover:text-cat-framework hover:bg-cat-framework/10"
                        >
                            <HiTrash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                {Object.keys(socials).length === 0 && (
                    <div className="text-center py-8 text-lara-sky/50 border border-dashed border-white/10 rounded-lg">
                        No social links added yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
