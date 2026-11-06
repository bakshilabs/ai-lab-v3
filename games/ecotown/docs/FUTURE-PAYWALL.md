# Future: paid access after the free period (saved notes, not built yet)

## Business model
- **The company (DeltaOps) holds admin access.** Teachers don't have admin accounts.
- A teacher asks the company for a batch of student passcodes covering a set period, for example one term. During that period, students play free.
- **After the period ends,** a student who wants to keep playing sees a **paywall** and can subscribe. Payment is through **Stripe**, with **Apple Pay and Google Pay** as well as cards.

## Already built (the foundation)
- **Passcode batches** with start and end dates, created by the company in `/admin`. Admin is behind Cloudflare Access.
- **One active session per passcode,** newest login wins, so codes can't be shared.
- **Expired codes** show "Your free access has ended. Ask your teacher." This is where the paywall will go.

## Paywall design
1. **The screen.** When an expired code logs in, show the paywall instead of the game. It is addressed to a **parent or guardian**, because players are 8–17: "Ask a grown-up to continue", with a simple parental check before payment.
2. **Checkout.** **Stripe Checkout** in subscription mode, hosted by Stripe.
   - Apple Pay and Google Pay appear automatically on supported devices once they're enabled in Stripe → Settings → Payment methods.
   - Hosted Checkout needs no Apple Pay domain verification on our side.
3. **Unlocking.** The Checkout session's `client_reference_id` is the passcode.
   - The Stripe **webhook** (`checkout.session.completed`, `customer.subscription.updated` and `.deleted`, `invoice.payment_failed`) goes to `/api/stripe/webhook`. The signature is checked with the webhook signing secret.
   - It records `stripe_customer`, `subscription_id`, `status` and `current_period_end` against the code.
   - An active subscription unlocks the code straight away. The same code keeps working, and the one-session rule still applies.
4. **Managing.** A "Manage subscription" link opens the **Stripe customer portal** to cancel or update payment. When a subscription is cancelled or a payment fails, the code goes back to the paywall at the end of the paid period.
5. **Data.** Stripe holds the payer's name, email and card. Eco Town stores only the code, batch, dates and Stripe IDs or status.
6. **Admin console additions:** a subscribers count and status per code, links to Stripe, and income totals taken from Stripe.

## Compliance to prepare
- Terms of sale, a privacy notice and a refund policy, linked on the paywall.
- Children's-service rules: the UK Age Appropriate Design Code, and COPPA in the US. The payer is an adult; collect no child personal data.
- Stripe Tax for VAT and sales tax if selling across countries.
- A data agreement with schools for the passcode batches.

## Open decisions
1. Price and interval (monthly, yearly or both) and currency.
2. Per-student only, or also a family plan.
3. A grace period after the free dates end, for example 3 days.
4. A custom domain such as `play.<brand>.com`, which looks more trustworthy on a payment page.
5. A Stripe account, with **test mode first**. The secret key gets saved via the secure credential form for `api.stripe.com`; the webhook secret becomes a Worker secret.
