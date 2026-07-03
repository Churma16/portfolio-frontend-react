import AdminHeader from "@/components/common/AdminHeader.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useChangePasswordForm} from "@/features/auth/Public/useChangePasswordForm.ts";
import {Check} from "lucide-react";

export default function ChangePasswordForm() {
    const {formData, handleInputChange, handleSubmit, isLoading, isSuccess} = useChangePasswordForm();

    return (
        <div className="min-h-screen pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <AdminHeader title={"Change Password"}
                             subtitle={"Secure your account by updating your password regularly."}/>
            </div>

            <div className="max-w-5xl mx-auto px-4 pt-8">
                <Card className="bg-admin-card/50 border-admin-border/50 text-foreground shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-heading">Change Password</CardTitle>
                        <CardDescription>
                            Update your password to keep your account secure.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <div className="flex flex-col md:flex-row gap-4 items-stretch w-full">
                                <div className="space-y-2 md:flex-1">
                                    <Label>Old Password</Label>
                                    <Input
                                        type="password"
                                        placeholder="sudo rm -rf /old_password"
                                        value={formData.old_password}
                                        onChange={(e) => handleInputChange('old_password', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2 md:flex-1">
                                    <Label>New Password</Label>
                                    <Input
                                        type="password"
                                        placeholder="chmod 700 /new_secret_key"
                                        value={formData.new_password}
                                        onChange={(e) => handleInputChange('new_password', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className={`min-w-[120px] transition-colors duration-300 ${
                                    isSuccess
                                        ? 'bg-green-600 hover:bg-green-600 text-white'
                                        : 'bg-primary hover:bg-blue-600'
                                }`}
                                disabled={isLoading || isSuccess}
                            >
                                {isLoading ? "Updating..." : isSuccess ? <><Check className="inline-block w-4 h-4 mr-1"/> Success!</> : "Update Password"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}