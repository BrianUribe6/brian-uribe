const VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const FAILED_TO_VERIFY_ERROR = "Failed to verify captcha";

type VerifyResponse = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes": string[];
  action: string;
  cdata: string;
};

/**
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
async function verifyCaptcha(
  token: string,
  secret: string,
  ip?: string | null
) {
  let formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (ip) {
    formData.append("remoteip", ip);
  }

  const result = await fetch(VERIFY_ENDPOINT, {
    body: formData,
    method: "POST",
  });

  if (!result.ok) {
    throw new Error(FAILED_TO_VERIFY_ERROR);
  }

  const outcome: VerifyResponse = await result.json();
  return outcome.success;
}

export default verifyCaptcha;
