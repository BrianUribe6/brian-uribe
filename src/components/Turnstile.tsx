import { useCallback, useEffect, useState } from "react";

type Turnstile = {
  /**
   * Render turnstile widget in the given node.
   */
  render(node: HTMLDivElement | string, params: RenderParams): string;

  /**
   * Remove turnstile widget with the given widgetId.
   */
  remove(widgetId: string): void;

  /**
   * Reset expired turnstile widget
   */
  reset(widgetId: string): void;
};

type RenderParams = {
  sitekey: string;

  /**
   * @default "always"
   */
  appearance?: "always" | "execute" | "interaction-only";

  /**
   * @default "auto"
   */
  theme?: "light" | "dark" | "auto";

  /**
   * @default "auto"
   */
  language?: string;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  cData?: string;
  callback?: (token: string) => void;
  execution?: "render" | "execute";
  "before-interactive-callback"?: () => void;
  "after-interactive-callback"?: () => void;
  "unsupported-callback"?: () => void;
  "timeout-callback"?: () => void;
  "response-field"?: boolean;
  size?: "normal" | "compact";
  retry?: "auto" | "never";
  "retry-interval"?: number;
  "refresh-expired"?: "auto" | "manual" | "never";
};

declare global {
  interface Window {
    turnstile: Turnstile;
  }
}

type Props = RenderParams;

/**
 * https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#disable-implicit-rendering
 */
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function Turnstile(props: Props) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<string>();

  const onLoaded = () => {
    setLoaded(true);
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Load turnstile script once for all instances
  useEffect(() => {
    const isScriptPresent = document.querySelector(
      `script[src="${TURNSTILE_SCRIPT_SRC}"]`
    );
    if (isScriptPresent) {
      if (window.turnstile) {
        onLoaded();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.onload = onLoaded;

    document.body.appendChild(script);
  }, []);

  // Remove widget on unmount
  useEffect(() => {
    return () => {
      if (widgetId) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [widgetId]);

  const renderTurnstile = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const widgetId = window.turnstile.render(node, {
      ...props,
      // Auto reset expired widget
      "expired-callback": () => {
        props["expired-callback"]?.();
        window.turnstile.reset(widgetId);
      },
    });
    setWidgetId(widgetId);
    // FIXME: array of dependencies should not change size
  }, Object.values(props));

  if (!mounted || !loaded) return null;
  return <div ref={renderTurnstile} />;
}

export default Turnstile;
