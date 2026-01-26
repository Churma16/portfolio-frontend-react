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
        <Card className="bg-admin-card/50 border-lara-border text-foreground shadow-lg">
            <CardHeader>
                <CardTitle className="font-heading">About You</CardTitle>
                <CardDescription>
                    Short introduction and your resume.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Bio Input Section */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Short Bio</Label>
                        <Textarea
                            {...register("bio_short")}
                            className="min-h-[100px] resize-none"
                            placeholder="Enter your short bio with HTML tags..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Full Biography</Label>
                        <Textarea
                            {...register("bio_long")}
                            className="min-h-[250px] font-mono text-sm resize-none"
                            placeholder="Enter your full biography with HTML tags..."
                        />
                    </div>
                </div>

                {/* Preview Section */}
                <div className="pt-6 border-t border-admin-border/50">
                    <h3 className="text-base font-semibold text-foreground mb-4">Live Preview</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Short Bio Preview */}
                        <div className="space-y-2">
                            <Label className="text-primary text-sm">Short Bio Preview</Label>
                            <div
                                className="bg-admin-field/50 p-4 rounded-lg min-h-[120px] border border-admin-border text-sm leading-relaxed prose prose-invert max-w-none">
                                {bioShort ? (
                                    <div
                                        dangerouslySetInnerHTML={{__html: bioShort}}
                                        className="text-foreground"
                                    />
                                ) : (
                                    <span className="text-accent/50 italic text-xs">Preview will appear here...</span>
                                )}
                            </div>
                        </div>

                        {/* Full Biography Preview */}
                        <div className="space-y-2">
                            <Label className="text-primary text-sm">Full Biography Preview</Label>
                            <div
                                className="bg-admin-field/50 p-4 rounded-lg min-h-[120px] max-h-[300px] border border-admin-border text-sm leading-relaxed overflow-y-auto prose prose-invert max-w-none">
                                {bioLong ? (
                                    <div
                                        dangerouslySetInnerHTML={{__html: bioLong}}
                                        className="text-foreground"
                                    />
                                ) : (
                                    <span className="text-accent/50 italic text-xs">Preview will appear here...</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-admin-border/50">
                    {/* Open to Work Switch */}
                    <div
                        className="flex items-center justify-between p-4 rounded-lg border border-admin-border bg-admin-field/20">
                        <div>
                            <Label className="font-semibold">Open to Work?</Label>
                            <p className="text-xs text-accent/60 mt-1">
                                Shows a "Hire Me" badge on your profile.
                            </p>
                        </div>
                        <Controller
                            control={control}
                            name="is_hireable"
                            render={({ field }) => (
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-green-500"
                                />
                            )}
                        />
                    </div>

                    {/* CV File Upload */}
                    <div
                        className="flex flex-col justify-center p-4 rounded-lg border border-admin-border bg-admin-field/20">
                        <Label className="font-semibold mb-3">Resume / CV (PDF)</Label>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => cvInputRef.current?.click()}
                                className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                            >
                                {cvFileList ? "Change File" : "Select PDF"}
                            </Button>
                            <span className="text-xs text-accent/60 truncate flex-1">
                                {fileName}
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf"
                                ref={(e) => {
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
