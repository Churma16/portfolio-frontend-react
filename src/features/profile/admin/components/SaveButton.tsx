import { Button } from "@/components/ui/button.tsx";
import { CgSpinner } from "react-icons/cg";

interface SaveButtonProps {
    isSubmitting: boolean;
    onClick?: () => void;
}

export default function SaveButton({ isSubmitting }: SaveButtonProps) {
    return (
        <div className="fixed bottom-6 right-8 z-50">
            <Button
                type="submit"
                size="lg"
                className="bg-lara-blue hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-105"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <CgSpinner className="animate-spin mr-2 h-5 w-5" />
                ) : null}
                {isSubmitting ? "Saving..." : "Save All Changes"}
            </Button>
        </div>
    );
}
