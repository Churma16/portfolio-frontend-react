import {useRef} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {ProfileFormValues} from "../ProfileDialog.tsx"; // Import tipe jika perlu

export default function BioCard() {
    const { register, control, watch, setValue } =
        useFormContext<ProfileFormValues>();
    const cvInputRef = useRef<HTMLInputElement>(null);

    const cvFileList = watch("cv_file");
    const existingCv = watch("cv_files"); // string url

    // Watch bio fields for live preview
    const bioShort = watch("bio_short");
    const bioLong = watch("bio_long");

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
        <Card className="bg-admin-card border-admin-border/30 text-foreground shadow-lg">
            <CardHeader>
                <CardTitle className="font-heading">About You</CardTitle>
                <CardDescription>
                    Short introduction and your resume.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: Text Inputs */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Short Bio</Label>
                            <Textarea
                                {...register("bio_short")}
                                className="bg-admin-field/10 min-h-[80px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Full Biography</Label>
                            <Textarea
                                {...register("bio_long")}
                                className="bg-admin-field/10 min-h-[200px] font-mono text-sm"
                            />
                        </div>
                    </div>

                    {/* Right Column: Live Preview */}
                    <div className="space-y-4">
                        {/* Short Bio Preview */}
                        <div className="space-y-2">
                            <Label className="text-primary">Short Bio Preview</Label>
                            <div
                                className="bg-admin-field/10 p-4 rounded-lg min-h-[80px] border border-admin-border/30 text-sm leading-relaxed prose prose-invert max-w-none">
                                {bioShort ? (
                                    <div
                                        dangerouslySetInnerHTML={{__html: bioShort}}
                                        className="text-foreground"
                                    />
                                ) : (
                                    <span className="text-accent/50 italic">Preview will appear here...</span>
                                )}
                            </div>
                        </div>

                        {/* Full Biography Preview */}
                        <div className="space-y-2">
                            <Label className="text-primary">Full Biography Preview</Label>
                            <div
                                className="bg-admin-field/10 p-4 rounded-lg min-h-[200px] border border-admin-border/30 text-sm leading-relaxed overflow-y-auto prose prose-invert max-w-none">
                                {bioLong ? (
                                    <div
                                        dangerouslySetInnerHTML={{__html: bioLong}}
                                        className="text-foreground"
                                    />
                                ) : (
                                    <span className="text-accent/50 italic">Preview will appear here...</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-white/10">
                    {/* Switch dengan Controller */}
                    <div
                        className="flex-1 flex items-center justify-between p-4 rounded-lg border border-admin-border/30">
                        <div>
                            <Label>Open to Work?</Label>
                            <p className="text-xs text-accent mt-1">
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
                                className="bg-white/5 border-white/10 text-primary"
                            >
                                {cvFileList ? "Change File" : "Select PDF"}
                            </Button>
                            <span className="text-xs text-accent/60 truncate max-w-[200px]">
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
