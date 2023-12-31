export const DUMMY_SITE_KEYS = {
  visible: {
    ALWAYS_PASS: "1x00000000000000000000AA",
    ALWAYS_BLOCK: "2x00000000000000000000BB",
    INTERACTION_ONLY: "3x00000000000000000000FF",
  },
  invisible: {
    ALWAYS_PASS: "1x00000000000000000000BB",
    ALWAYS_BLOCK: "2x00000000000000000000BB",
  },
} as const;

export const DUMMY_SECRET_KEYS = {
  ALWAYS_PASS: "1x0000000000000000000000000000000AA",
  ALWAYS_FAIL: "2x0000000000000000000000000000000AA",
  ALREADY_USED: "3x0000000000000000000000000000000AA",
} as const;
