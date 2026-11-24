/**
 * Fail-safe, non-blocking telemetry event tracker.
 * Dispatches client events to /api/events via navigator.sendBeacon
 * with fallback to keepalive fetch.
 */
export function trackEvent(type: string, metadata?: Record<string, string>): void {
    try {
        if (typeof window === "undefined") {
            return;
        }

        const payload = JSON.stringify({
            source: "frontend",
            type,
            ...(metadata && Object.keys(metadata).length > 0 ? { metadata } : {}),
            timestamp: new Date().toISOString(),
        });

        // 1. Prefer navigator.sendBeacon for reliable async background delivery
        if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
            try {
                const blob = new Blob([payload], { type: "application/json" });
                if (navigator.sendBeacon("/api/events", blob)) {
                    return;
                }
            } catch {
                // sendBeacon threw; continue to fetch fallback
            }
        }

        // 2. Fallback to fetch with keepalive: true
        if (typeof fetch === "function") {
            fetch("/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: payload,
                keepalive: true,
            }).catch(() => {
                // Silently swallow network / background errors to prevent UI disruption
            });
        }
    } catch {
        // Completely fail-safe: never disrupt UI or bubble exceptions
    }
}
