import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HiPlus, HiTrash} from "react-icons/hi2";

interface SocialCardProps {
    socialsArray: Array<{ platform: string; url: string }>;
    setSocialsArray: (socials: Array<{ platform: string; url: string }>) => void;
}

export default function SocialCard({socialsArray, setSocialsArray}: SocialCardProps) {
    const handleAddSocial = () => {
        setSocialsArray([...socialsArray, {platform: "", url: ""}]);
    };

    const handleUpdateSocial = (idx: number, field: "platform" | "url", value: string) => {
        const updated = [...socialsArray];
        updated[idx] = {...updated[idx], [field]: value};
        setSocialsArray(updated);
    };

    const handleRemoveSocial = (idx: number) => {
        setSocialsArray(socialsArray.filter((_, i) => i !== idx));
    };

    return (
        <Card className="bg-admin-card/50 border-admin-border/50 text-foreground shadow-lg">
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
                    onClick={handleAddSocial}
                >
                    <HiPlus className="w-4 h-4 mr-2" /> Add Platform
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {socialsArray.map((social, idx) => (
                    <div key={idx} className="flex gap-3 items-end">
                        <div className="w-1/3 max-w-[200px]">
                            {/* Input untuk Platform */}
                            <Input
                                placeholder="Platform (e.g., github)"
                                value={social.platform}
                                onChange={(e) => handleUpdateSocial(idx, "platform", e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            {/* Input untuk URL */}
                            <Input
                                placeholder="https://..."
                                value={social.url}
                                onChange={(e) => handleUpdateSocial(idx, "url", e.target.value)}
                            />
                        </div>
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveSocial(idx)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            <HiTrash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                {socialsArray.length === 0 && (
                    <div
                        className="text-center py-8 text-accent/50 border border-dashed border-admin-border rounded-lg">
                        No social links added yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
