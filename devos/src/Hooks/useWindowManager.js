import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "devos-windows-v1";

export function useWindowManager() {
    const [openWindows, setOpenWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);

    const highestZ = useMemo(() => {
        return openWindows.reduce((max, w) => Math.max(max, w.zIndex || 0), 0) + 1;
    }, [openWindows]);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;

            const parsed = JSON.parse(raw);
            const restoredWindows = Array.isArray(parsed?.openWindows)
                ? parsed.openWindows
                : [];
            const restoredActive = parsed?.activeWindowId ?? null;

            setOpenWindows(restoredWindows);
            setActiveWindowId(restoredActive);
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    useEffect(() => {
        const payload = { openWindows, activeWindowId };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }, [openWindows, activeWindowId]);

    const openWindow = useCallback(
        (app, payload) => {
            setOpenWindows((prev) => {
                const existing = prev.find((w) => w.id === app.id);

                if (existing) {
                    setActiveWindowId(app.id);
                    return prev.map((w) =>
                        w.id === app.id
                            ? {
                                ...w,
                                zIndex: highestZ,
                                minimized: false,
                                payload: payload ?? w.payload,
                            }
                            : w
                    );
                }

                setActiveWindowId(app.id);
                return [
                    ...prev,
                    {
                        ...app,
                        payload,
                        zIndex: highestZ,
                        minimized: false,
                        maximized: false,
                    },
                ];
            });
        },
        [highestZ]
    );

    const closeWindow = useCallback((id) => {
        setOpenWindows((prev) => prev.filter((w) => w.id !== id));
        setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
    }, []);

    const minimizeWindow = useCallback((id) => {
        setOpenWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
        );
        setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
    }, []);

    const toggleMaximizeWindow = useCallback((id) => {
        setOpenWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
        );
    }, []);

    const focusWindow = useCallback(
        (id) => {
            setOpenWindows((prev) =>
                prev.map((w) =>
                    w.id === id ? { ...w, zIndex: highestZ, minimized: false } : w
                )
            );
            setActiveWindowId(id);
        },
        [highestZ]
    );

    const toggleWindowFromTaskbar = useCallback(
        (id) => {
            const win = openWindows.find((w) => w.id === id);
            if (!win) return;

            if (activeWindowId === id && !win.minimized) {
                minimizeWindow(id);
                return;
            }

            focusWindow(id);
        },
        [openWindows, activeWindowId, focusWindow, minimizeWindow]
    );

    const clearSession = useCallback(() => {
        setOpenWindows([]);
        setActiveWindowId(null);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        openWindows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        focusWindow,
        toggleWindowFromTaskbar,
        clearSession,
    };
}