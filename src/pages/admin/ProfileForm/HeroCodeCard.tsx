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

interface HeroCodeCardProps {
    codes: string[];
    onAddLine: () => void;
    onRemoveLine: (index: number) => void;
    onUpdateLine: (index: number, value: string) => void;
}

export default function HeroCodeCard({
    codes,
    onAddLine,
    onRemoveLine,
    onUpdateLine,
}: HeroCodeCardProps) {
    return (
        <Card className="bg-card-bg-lara-admin border-card-border-lara-admin text-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-heading">
                        Hero Code Animation
                    </CardTitle>
                    <CardDescription>
                        Lines of code displayed on the home page typewriter
                        effect.
                    </CardDescription>
                </div>
                <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={onAddLine}
                    className="gap-2"
                >
                    <HiPlus className="w-4 h-4" /> Add Line
                </Button>
            </CardHeader>
            <CardContent className="space-y-2">
                {codes.map((line, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                        <span className="text-lara-sky/40 font-mono text-xs w-6 text-right select-none">
                            {idx + 1}
                        </span>
                        <Input
                            value={line}
                            onChange={(e) => onUpdateLine(idx, e.target.value)}
                            className="bg-field-bg-lara-admin border-card-border-lara-admin text-cat-technique font-mono text-sm border-l-2 border-l-lara-blue/30 rounded-none focus-visible:ring-lara-blue placeholder-lara-sky/30"
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => onRemoveLine(idx)}
                            className="text-lara-sky/60 hover:text-cat-framework hover:bg-cat-framework/10"
                        >
                            <HiTrash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
