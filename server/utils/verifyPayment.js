import https from "https";

/**
 * Verifies a Paystack transaction reference server-side, so an order can never
 * be marked "paid" just because a client claims it is. Requires PAYSTACK_SECRET_KEY
 * to be set in server/.env (the *secret* key from your Paystack dashboard - never
 * the public key used on the client).
 *
 * Resolves with Paystack's transaction data ({status, amount, currency, ...}) on success,
 * throws an Error with a user-safe message otherwise.
 */
export const verifyPaystackTransaction = (reference) => {
  return new Promise((resolve, reject) => {
    if (!process.env.PAYSTACK_SECRET_KEY) {
      return reject(new Error("Payment verification is not configured on the server"));
    }

    const options = {
      hostname: "api.paystack.co",
      path: `/transaction/verify/${encodeURIComponent(reference)}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };

    const request = https.request(options, (response) => {
      let raw = "";
      response.on("data", (chunk) => (raw += chunk));
      response.on("end", () => {
        try {
          const parsed = JSON.parse(raw);
          if (!parsed.status || parsed.data?.status !== "success") {
            return reject(new Error("Payment could not be verified"));
          }
          resolve(parsed.data);
        } catch (error) {
          reject(new Error("Payment could not be verified"));
        }
      });
    });

    request.on("error", () => reject(new Error("Payment could not be verified")));
    request.end();
  });
};
