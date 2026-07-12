export const PRIVACY_POLICY_LAST_UPDATED = "July 12, 2026";

export const PRIVACY_POLICY_INTRO = "This page explains what information this site collects and how it is used. Data collection here is kept to a minimum.";

export type PrivacyPolicySectionIconName = "ClipboardList" | "Eye" | "Database" | "Globe" | "Scale" | "Mail";

export interface PrivacyPolicySection {
    id: string;
    iconName: PrivacyPolicySectionIconName;
    title: string;
    content: string;
    list?: string[];
}

export const PRIVACY_POLICY_SECTIONS: PrivacyPolicySection[] = [
    {
        id: "information-collect",
        iconName: "ClipboardList",
        title: "Information I Collect",
        content: "This site does not require you to create an account. The only information collected is what you voluntarily provide through the contact form, including:",
        list: [
            "Your name",
            "Your email address",
            "The message you send"
        ]
    },
    {
        id: "how-i-use-it",
        iconName: "Eye",
        title: "How I Use It",
        content: "The information you submit is used only to respond to your inquiry, whether that is about a job opportunity, freelance project, or general question. I do not sell, rent, or share your data with third parties."
    },
    {
        id: "data-storage",
        iconName: "Database",
        title: "Data Storage",
        content: "Messages submitted through the contact form are sent to my email inbox. I do not use them for any purpose beyond replying to you."
    },
    {
        id: "third-party-services",
        iconName: "Globe",
        title: "Third-Party Services",
        content: "This site is hosted on DigitalOcean and served through Cloudflare, which may collect standard technical data (such as IP address) for security and performance purposes, as part of their own service operations."
    },
    {
        id: "your-rights",
        iconName: "Scale",
        title: "Your Rights",
        content: "You can contact me anytime to ask what information I have from you, or to request it be deleted."
    },
    {
        id: "contact",
        iconName: "Mail",
        title: "Contact",
        content: "If you have questions about this policy, reach out through the contact form on this site."
    }
];
