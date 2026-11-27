
'use client';

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

import liff from '@line/liff';

interface LiffUser {
    userId: string;
    displayName: string;
    pictureUrl?: string;
}

interface LiffContextType {
    loading: boolean;
    error: string;
    isInitialized: boolean;
    isInClient: boolean;
    isLoggedIn: boolean;
    idToken: string | null;
    user: LiffUser | null;
    login: () => void;
    scopes: string[];
}

const LiffContext = createContext<LiffContextType | null>(null);

// ป้องกัน LIFF Initialize ซ้ำใน React Strict Mode
let liffInitPromise: Promise<void> | null = null;

function initializeLiff() {
    if (!liffInitPromise) {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

        if (!liffId) {
            throw new Error('LIFF ID is not configured');
        }

        liffInitPromise = liff.init({ liffId });
    }

    return liffInitPromise;
}

export function LiffProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const [isInClient, setIsInClient] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idToken, setIdToken] = useState<string | null>(null);
    const [user, setUser] = useState<LiffUser | null>(null);
    const [scopes, setScopes] = useState<string[]>([]);

    useEffect(() => {
        let cancelled = false;

        async function setupLiff() {
            try {
                await initializeLiff();
                const context = liff.getContext();
                setScopes(context?.scope ?? []);

                if (cancelled) return;

                const insideLine = liff.isInClient();
                const loggedIn = liff.isLoggedIn();
                const token = loggedIn ? liff.getIDToken() : null;

                setIsInitialized(true);
                setIsInClient(insideLine);
                setIsLoggedIn(loggedIn);
                setIdToken(token);

                if (loggedIn) {
                    const profile = await liff.getProfile();

                    if (cancelled) return;

                    setUser({
                        userId: profile.userId,
                        displayName: profile.displayName,
                        pictureUrl: profile.pictureUrl,
                    });
                }
            } catch (err) {
                if (cancelled) return;

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Unable to initialize LIFF',
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        setupLiff();

        return () => {
            cancelled = true;
        };
    }, []);

    function login() {
        liff.login();
    }

    return (
        <LiffContext.Provider
            value={{
                loading,
                error,
                isInitialized,
                isInClient,
                isLoggedIn,
                idToken,
                user,
                login,
                scopes,
            }}
        >
            {children}
        </LiffContext.Provider>
    );
}

export function useLiff() {
    const context = useContext(LiffContext);

    if (!context) {
        throw new Error('useLiff must be used inside LiffProvider');
    }

    return context;
}
