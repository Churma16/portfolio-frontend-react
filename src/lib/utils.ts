import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Fungsi 'cn' (Class Name) ini menggabungkan clsx dan tailwind-merge
// Contoh guna: cn("bg-red-500", isActive && "bg-blue-500")
// tailwind-merge akan memastikan tidak ada konflik class (misal p-2 vs p-4)
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
