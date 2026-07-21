export interface ProfileFormData {
    name: string;
    headline: string;
    role: string;
    location: string;
    bio_short: string;
    bio_long: string;
    is_hireable: boolean;
    socials: Array<{ platform: string; url: string }>;
    hero_image_codes: Array<{ value: string }>;
}

export interface UseProfileFormProps {
    open: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

/**
 * Clean text: trim & remove extra whitespace
 */
export const normalizeWhitespace = (inputText: string): string =>
    inputText ? inputText.trim().replace(/\s+/g, " ") : "";

/**
 * Transform form socials array → DB object format
 * Form: [{ platform: 'twitter', url: 'url1' }]
 * DB: { twitter: 'url1' }
 */
export const serializeSocialsForDatabase = (socialMediaList: Array<{ platform: string; url: string }>): string => {
    const serializedSocialsRecord = (socialMediaList || []).reduce((accumulatedSocials, currentSocialMedia) => {
        if (currentSocialMedia.platform && currentSocialMedia.url) {
            accumulatedSocials[currentSocialMedia.platform.trim()] = currentSocialMedia.url.trim();
        }
        return accumulatedSocials;
    }, {} as Record<string, string>);
    return JSON.stringify(serializedSocialsRecord);
};

/**
 * Transform form hero codes → DB array format
 * Form: [{ value: 'code1' }, { value: 'code2' }]
 * DB: ["code1", "code2"]
 */
export const serializeHeroCodesForDatabase = (heroCodeList: Array<{ value: string }>): string => {
    const processedHeroCodes = (heroCodeList || [])
        .map((currentHeroCode) => currentHeroCode.value.trim())
        .filter((codeValue) => codeValue !== "");
    return JSON.stringify(processedHeroCodes);
};

/**
 * Transform DB socials object → form array format
 * DB: { twitter: 'url1' }
 * Form: [{ platform: 'twitter', url: 'url1' }]
 */
export const deserializeSocialsFromDatabase = (databaseSocialsObject: any): Array<{ platform: string; url: string }> => {
    if (!databaseSocialsObject || typeof databaseSocialsObject !== "object") return [];
    return Object.entries(databaseSocialsObject).map(([socialPlatform, platformUrl]) => ({
        platform: socialPlatform,
        url: platformUrl as string,
    }));
};

/**
 * Transform DB hero codes string → form array format
 * DB: "[\"code1\", \"code2\"]" or ["code1", "code2"]
 * Form: [{ value: 'code1' }, { value: 'code2' }]
 */
export const deserializeHeroCodesFromDatabase = (databaseHeroCodes: any): Array<{ value: string }> => {
    let extractedHeroCodesList: string[] = [];

    if (typeof databaseHeroCodes === "string") {
        try {
            extractedHeroCodesList = JSON.parse(databaseHeroCodes);
        } catch {
            extractedHeroCodesList = [];
        }
    } else if (Array.isArray(databaseHeroCodes)) {
        extractedHeroCodesList = databaseHeroCodes;
    }

    return extractedHeroCodesList.map((heroCodeString: string) => ({ value: heroCodeString }));
};
