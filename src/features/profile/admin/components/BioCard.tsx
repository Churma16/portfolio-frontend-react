import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Switch} from "@/components/ui/switch.tsx";

interface BioCardProps {
    formData: {
        bio_short: string;
        bio_long: string;
        is_hireable: boolean;
    };
    handleInputChange: (field: string, value: any) => void;
    cvFile: File | null;
    handleCVChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BioCard({
                                    formData,
                                    handleInputChange,
                                    cvFile,
                                    handleCVChange,
                                }: BioCardProps) {
    return (
        <Card className="bg-admin-card/50 border-admin-border/50 text-foreground shadow-lg">
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
                            value={formData.bio_short}
                            onChange={(e) => handleInputChange("bio_short", e.target.value)}
                            className="min-h-[100px] resize-none"
                            placeholder="Enter your short bio with HTML tags..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Full Biography</Label>
                        <Textarea
                            value={formData.bio_long}
                            onChange={(e) => handleInputChange("bio_long", e.target.value)}
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
                                {formData.bio_short ? (
                                    <div
                                        dangerouslySetInnerHTML={{__html: formData.bio_short}}
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
                                {formData.bio_long ? (
                                    <div
                                        dangerouslySetInnerHTML={{__html: formData.bio_long}}
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
                        <Switch
                            checked={formData.is_hireable}
                            onCheckedChange={(value) => handleInputChange("is_hireable", value)}
                            className="data-[state=checked]:bg-green-500"
                        />
                    </div>

                    {/* CV File Upload */}
                    <div
                        className="flex flex-col justify-center p-4 rounded-lg border border-admin-border bg-admin-field/20">
                        <Label className="font-semibold mb-3">Resume / CV (PDF)</Label>
                        <div className="flex items-center gap-2">
                            <label>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const input = document.querySelector('input[type="file"][accept=".pdf"]') as HTMLInputElement;
                                        input?.click();
                                    }}
                                >
                                    {cvFile ? "Change File" : "Select PDF"}
                                </button>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={handleCVChange}
                                />
                            </label>
                            <span className="text-xs text-accent/60 truncate flex-1">
                                {cvFile ? cvFile.name : "No file uploaded"}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
