import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  getStoredUser,
  logoutClientSession,
  SESSION_LAST_ACTIVITY_KEY,
  SESSION_LOGOUT_AT_KEY,
} from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const WARNING_DURATION_MS = 60 * 1000;
const WARNING_THRESHOLD_MS = IDLE_TIMEOUT_MS - WARNING_DURATION_MS;
const ACTIVITY_EVENTS: Array<keyof WindowEventMap> = [
  "mousemove",
  "keydown",
  "scroll",
  "click",
];

function toTimestamp(value: string | null) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function SessionIdleManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutGuardRef = useRef(false);
  const lastPersistedActivityRef = useRef(0);
  const lastActivityRef = useRef(Date.now());

  const [warningOpen, setWarningOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const hasUser = Boolean(getStoredUser());
  const isAuthPage = location.pathname === "/login";
  const shouldTrack = hasUser && !isAuthPage;

  const applyActivity = useCallback((timestamp: number, mirrorToStorage: boolean) => {
    lastActivityRef.current = timestamp;
    setWarningOpen(false);

    if (mirrorToStorage) {
      localStorage.setItem(SESSION_LAST_ACTIVITY_KEY, String(timestamp));
    }
  }, []);

  const performLogout = useCallback(
    (reason: string, broadcast: boolean) => {
      if (logoutGuardRef.current) return;
      logoutGuardRef.current = true;

      logoutClientSession({ broadcast });
      setWarningOpen(false);
      toast.info(reason);
      navigate("/login", { replace: true });
    },
    [navigate],
  );

  useEffect(() => {
    if (shouldTrack) {
      logoutGuardRef.current = false;
    }
  }, [shouldTrack]);

  useEffect(() => {
    if (!shouldTrack) {
      setWarningOpen(false);
      return;
    }

    const now = Date.now();
    const storedLastActivity = toTimestamp(localStorage.getItem(SESSION_LAST_ACTIVITY_KEY));
    const initialActivity = storedLastActivity || now;
    applyActivity(initialActivity, !storedLastActivity);
    lastPersistedActivityRef.current = initialActivity;

    const onActivity = () => {
      if (!getStoredUser()) return;

      const activityNow = Date.now();
      if (activityNow - lastPersistedActivityRef.current < 1000) return;

      lastPersistedActivityRef.current = activityNow;
      applyActivity(activityNow, true);
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === SESSION_LAST_ACTIVITY_KEY) {
        const next = toTimestamp(event.newValue);
        if (next > 0) {
          applyActivity(next, false);
        }
        return;
      }

      if (event.key === SESSION_LOGOUT_AT_KEY && event.newValue) {
        performLogout("Session ended in another tab.", false);
      }
    };

    const interval = window.setInterval(() => {
      if (!getStoredUser()) return;

      const nowTick = Date.now();
      const idleMs = nowTick - lastActivityRef.current;
      const remainingMs = IDLE_TIMEOUT_MS - idleMs;

      if (remainingMs <= 0) {
        performLogout("Session expired due to inactivity.", true);
        return;
      }

      if (idleMs >= WARNING_THRESHOLD_MS) {
        setWarningOpen(true);
        setSecondsLeft(Math.max(1, Math.ceil(remainingMs / 1000)));
      } else {
        setWarningOpen(false);
      }
    }, 1000);

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, onActivity, { passive: true });
    });
    window.addEventListener("storage", onStorage);

    return () => {
      window.clearInterval(interval);
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, onActivity);
      });
      window.removeEventListener("storage", onStorage);
    };
  }, [applyActivity, performLogout, shouldTrack]);

  const countdownText = useMemo(
    () => `You will be logged out in ${secondsLeft} second${secondsLeft === 1 ? "" : "s"}.`,
    [secondsLeft],
  );

  if (!shouldTrack) {
    return null;
  }

  return (
    <AlertDialog open={warningOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session Timeout Warning</AlertDialogTitle>
          <AlertDialogDescription>{countdownText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => performLogout("Logged out.", true)}>
            Log out now
          </Button>
          <Button
            onClick={() => {
              const now = Date.now();
              lastPersistedActivityRef.current = now;
              applyActivity(now, true);
            }}
          >
            Stay logged in
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
