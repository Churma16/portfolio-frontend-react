import { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ProfileFormValues } from "./ProfileForm";

export default function BioCard() {
    const { register, control, watch, setValue } =
        useFormContext<ProfileFormValues>();
    const cvInputRef = useRef<HTMLInputElement>(null);

    const cvFileList = watch("cv_file");
    const existingCv = watch("cv_files"); // string url

    // Nama file untuk display
    const fileName =
        cvFileList && cvFileList.length > 0
            ? cvFileList[0].name
            : existingCv
            ? existingCv.split("/").pop()
            : "No file uploaded";

    const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // Manually set FileList ke form state
            setValue("cv_file", e.target.files);
        }
    };

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
                        <Label>Short Bio</Label>
                        <Textarea
                            {...register("bio_short")}
                            className="bg-field-bg-lara-admin min-h-[80px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Full Biography</Label>
                        <Textarea
                            {...register("bio_long")}
                            className="bg-field-bg-lara-admin min-h-[200px] font-mono text-sm"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-white/10">
                    {/* Switch dengan Controller */}
                    <div className="flex-1 flex items-center justify-between p-4 rounded-lg bg-field-bg-lara-admin border border-card-border-lara-admin">
                        <div>
                            <Label>Open to Work?</Label>
                            <p className="text-xs text-lara-sky/60 mt-1">
                                Shows a "Hire Me" badge.
                            </p>
                        </div>
                        <Controller
                            control={control}
                            name="is_hireable"
                            render={({ field }) => (
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-cat-testing"
                                />
                            )}
                        />
                    </div>

                    {/* CV File Upload */}
                    <div className="flex-1 space-y-2">
                        <Label>Resume / CV (PDF)</Label>
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => cvInputRef.current?.click()}
                                className="bg-white/5 border-white/10 text-lara-blue"
                            >
                                {cvFileList ? "Change File" : "Select PDF"}
                            </Button>
                            <span className="text-xs text-lara-sky/60 truncate max-w-[200px]">
                                {fileName}
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf"
                                ref={(e) => {
                                    // Simpan ref lokal untuk click handler
                                    cvInputRef.current = e;
                                }}
                                onChange={handleCvChange}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
