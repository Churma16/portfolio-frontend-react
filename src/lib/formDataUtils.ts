/**
 * Utility to convert Javascript objects into FormData
 * Supports nested arrays (JSON stringified), File objects, and Laravel _method spoofing.
 */
interface BuildFormDataOptions {
    activeBackend?: string;
    isUpdate?: boolean;
    customFiles?: Record<string, File | null | undefined>;
}

export function buildFormData(
    data: Record<string, unknown>,
    options?: BuildFormDataOptions
): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            return;
        }

        if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
            return;
        }

        if (value instanceof File) {
            formData.append(key, value);
            return;
        }

        if (typeof value === "string" && value.trim() === "") {
            return;
        }

        formData.append(key, String(value));
    });

    // Append custom file attachments if provided
    if (options?.customFiles) {
        Object.entries(options.customFiles).forEach(([key, file]) => {
            if (file instanceof File) {
                formData.append(key, file);
            }
        });
    }

    // Handle Laravel PUT spoofing for multipart/form-data
    if (options?.isUpdate && options?.activeBackend === "laravel") {
        if (!formData.has("_method")) {
            formData.append("_method", "PUT");
        }
    }

    return formData;
}

export function hasFilePayload(data: unknown): boolean {
    if (!data || typeof data !== "object") {
        return false;
    }

    if (data instanceof File) {
        return true;
    }

    if (data instanceof FormData) {
        return true;
    }

    return Object.values(data as Record<string, unknown>).some(
        (value) =>
            value instanceof File ||
            (Array.isArray(value) && value.some((innerValue) => innerValue instanceof File))
    );
}
