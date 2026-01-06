import { useRef } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface BioCardProps {
    formData: {
        bio_short: string;
        bio_long: string;
        is_hireable: boolean;
        cv_files: string | null;
    };
    cvFile: File | null;
    onBioShortChange: (value: string) => void;
    onBioLongChange: (value: string) => void;
    onHireableChange: (value: boolean) => void;
    onCvFileChange: (file: File | null) => void;
}

export default function BioCard({
    formData,
    cvFile,
    onBioShortChange,
    onBioLongChange,
    onHireableChange,
    onCvFileChange,
}: BioCardProps) {
    const cvInputRef = useRef<HTMLInputElement>(null);

    return (
        <Card className="bg-card-bg-lara-admin border-card-border-lara-admin text-white shadow-lg">
            <CardHeader>
                <CardTitle className="font-heading">About You</CardTitle>
                <CardDescription>
                    Short introduction and your resume.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <Label className="text-lara-sky/90">
                            Short Bio (Home Page)
                        </Label>
                        <Textarea
                            value={formData.bio_short}
                            onChange={(e) => onBioShortChange(e.target.value)}
                            className="bg-field-bg-lara-admin border-card-border-lara-admin min-h-[80px] focus-visible:ring-lara-blue placeholder-lara-sky/30"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-lara-sky/90">
                            Full Biography (About Page - Markdown)
                        </Label>
                        <Textarea
                            value={formData.bio_long}
                            onChange={(e) => onBioLongChange(e.target.value)}
                            className="bg-field-bg-lara-admin border-card-border-lara-admin min-h-[200px] font-mono text-sm focus-visible:ring-lara-blue placeholder-lara-sky/30"
                        />
                    </div>
                </div>

                {/* Status & CV Row */}
                <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-white/10">
                    <div className="flex-1 flex items-center justify-between p-4 rounded-lg bg-field-bg-lara-admin border border-card-border-lara-admin">
                        <div>
                            <Label className="text-base text-lara-sky/90">
                                Open to Work?
                            </Label>
                            <p className="text-xs text-lara-sky/60 mt-1">
                                Shows a "Hire Me" badge on your profile.
                            </p>
                        </div>
                        <Switch
                            checked={formData.is_hireable}
                            onCheckedChange={onHireableChange}
                            className="data-[state=checked]:bg-cat-testing"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <Label className="text-lara-sky/90">
                            Resume / CV (PDF)
                        </Label>
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => cvInputRef.current?.click()}
                                className="bg-white/5 border-white/10 hover:bg-white/10 text-lara-blue"
                            >
                                {cvFile ? "Change File" : "Select PDF"}
                            </Button>
                            <span className="text-xs text-lara-sky/60 truncate max-w-[200px]">
                                {cvFile
                                    ? cvFile.name
                                    : formData.cv_files
                                    ? formData.cv_files.split("/").pop()
                                    : "No file uploaded"}
                            </span>
                            <input
                                type="file"
                                ref={cvInputRef}
                                className="hidden"
                                accept=".pdf"
                                onChange={(e) =>
                                    onCvFileChange(e.target.files?.[0] || null)
                                }
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
