import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HiPlus, HiTrash} from "react-icons/hi2";

interface HeroCodeCardProps {
    heroCodesArray: Array<{ value: string }>;
    setHeroCodesArray: (codes: Array<{ value: string }>) => void;
}

export default function HeroCodeCard({heroCodesArray, setHeroCodesArray}: HeroCodeCardProps) {
    const handleAddCode = () => {
        setHeroCodesArray([...heroCodesArray, {value: ""}]);
    };

    const handleUpdateCode = (idx: number, value: string) => {
        const updated = [...heroCodesArray];
        updated[idx] = {...updated[idx], value};
        setHeroCodesArray(updated);
    };

    const handleRemoveCode = (idx: number) => {
        setHeroCodesArray(heroCodesArray.filter((_, i) => i !== idx));
    };

    return (
        <Card className="bg-admin-card/50 border-lara-border text-foreground shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-heading">
                        Hero Code Animation
                    </CardTitle>
                    <CardDescription>
                        Lines of code displayed on home page.
                    </CardDescription>
                </div>
                <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={handleAddCode}
                >
                    <HiPlus className="w-4 h-4 mr-2" /> Add Line
                </Button>
            </CardHeader>
            <CardContent className="space-y-2">
                {heroCodesArray.map((code, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                        <span className="text-accent/40 font-mono text-xs w-6 text-right">
                            {idx + 1}
                        </span>
                        {/* Input for code */}
                        <Input
                            value={code.value}
                            onChange={(e) => handleUpdateCode(idx, e.target.value)}
                            className="font-mono text-sm"
                            placeholder="const code = 'hero';"
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveCode(idx)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            <HiTrash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
