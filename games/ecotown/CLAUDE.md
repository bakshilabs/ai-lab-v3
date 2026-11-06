# Eco Town: notes for the next Claude Code session

Eco Town is a browser game (three.js voxel) with two versions, for ages 8–12 and 13–17. Players build a sustainable town with **Plotter**, an AI planner that is sometimes confidently wrong, and learn to catch its mistakes.

| For | See |
|---|---|
| How to run and deploy | `README.md` |
| The game's design | `DESIGN.md` |
| Teachers and facilitators | `LAB-GUIDE.md` |
| Future paywall plan (not built yet) | `docs/FUTURE-PAYWALL.md` |

Work happens on branch `claude/focused-cori-qeoveu`, which is **not merged to `main` yet**.

## Who the user is and what they want
- **The business.** The user runs a game design company and keeps admin access themselves:
  - teachers ask the company for a **batch of passcodes** for a set period;
  - students play free with those codes during the period;
  - **later**, a Stripe paywall with Apple Pay or Google Pay comes in once the free period ends. It is not built yet; see `docs/FUTURE-PAYWALL.md`.
- **Look the user approved:**
  - a floating island in a brochure style, with a terracotta, warm palette;
  - **small trees**, but **large canyons**.
- **Teaching style:** show how things are built "**system by system, layer by layer**", using construction films, not swarming effects.
- **Explanations:** the user wants plain, non-technical explanations and step-by-step dashboard instructions.
- **Security rules:**
  - never ask for or paste secrets in chat; credentials go through the secure form, `request_credential`;
  - the classroom site must **never be public by mistake**;
  - the GitHub Pages test version is meant to be public, with no login.

## Live setup
| What | Where |
|---|---|
| Students (passcode) | https://ecotown.deltaops.workers.dev |
| Admin (company only) | https://ecotown.deltaops.workers.dev/admin, via Cloudflare Access ("Sign in with Cloudflare") |
| Public test version | https://bakshilabs.github.io/ai-lab-v3/. Not live yet; see Open items |

**Cloudflare account**
- Account id `9c5ee116be85caa02b46ec934ed28bbf`, owned by vs.code.iloader@gmail.com.
- The workers.dev subdomain is `deltaops`. The user renamed it from `vs-code-iloader` in the dashboard.

**Worker `ecotown`** (in `worker/`)

| File | Role |
|---|---|
| `worker.js` | Router, passcode page, Access token check for `/admin` |
| `store.js` | Durable Object `CodeStore` (SQLite), binding `CODES` |
| `codes.js` | Passcode logic: batches, `WORD-1234` codes, newest login wins, rate limit |
| `admin.html` | Admin console |

- The game sends a heartbeat every 60 s from `game/js/main.js`.
- workers.dev is **on**. Preview URLs are **off**.

**Cloudflare Access app "Eco Town admin"**
- Team: `lively-silence-ec13.cloudflareaccess.com`.
- App id `4265ca95-ac22-4204-9a65-3cabf6de3b61`.
- AUD `2fd6668e3bbe8607cd949c86d1da34d104d9486ff85529c348f09fdb581987dc`. This is hard-coded in `worker.js`.
- Domains: `ecotown.deltaops.workers.dev/admin`, `ecotown.pages.dev` and `*.ecotown.pages.dev`.
- Policy "Allowed people": `vs.code.iloader@gmail.com`.
- One-time PIN login could not be created through the API, so the login is "Sign in with Cloudflare".

**Leftover:** an empty, login-protected Pages project `ecotown.pages.dev`. It can be deleted if the user agrees.

## Deploying from a cloud session
- **API token:** if no Cloudflare token is configured, call `request_credential` for host `api.cloudflare.com`. The proxy then injects it, so curl can send any dummy `Authorization: Bearer x`.
- **Deploy command:**
  ```bash
  cd games/ecotown && node build.mjs && NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt CF_ACCOUNT_ID=9c5ee116be85caa02b46ec934ed28bbf node worker/deploy.mjs
  ```
- **Proxy:** Node's fetch skips the proxy without `NODE_USE_ENV_PROXY=1`.
- **Wrangler** Pages uploads fail behind the proxy, which is why we deploy as a Worker with one API call.
- **Migrations:** `deploy.mjs` retries without the Durable Object migration once it already exists, and keeps secret bindings.
- **Check after a deploy:**
  - `/` returns 200 with the passcode page;
  - `/assets/x.js` returns 403;
  - `/admin` redirects (302) to `…cloudflareaccess.com`.

## Tests
From `games/ecotown/game` (53 tests, all passing at handoff):

```bash
node --test tests/sim.test.mjs tests/model.test.mjs tests/teach.test.mjs tests/syntax.test.mjs tests/codes.test.mjs
```

There's also a Playwright play-through: `tests/playwright/run.mjs`. See the README.

## Open items
1. **Live end-to-end passcode test** (login, second device replaces the first, switch-off) has not been run against the real site.
   - The plan was a temporary `ADMIN_TEST_KEY` Worker secret, which `worker.js` accepts in the `X-Admin-Test-Key` header, but writing that secret was blocked by the safety checker.
   - Instead, ask the user to create a test batch at `/admin` and share one code, or to approve the secret.
2. **GitHub Pages** (`.github/workflows/ecotown-pages.yml`): the build passes, but deploy needs a repo admin to:
   - set Settings → Pages → Source to "GitHub Actions";
   - allow the branch under Environments → github-pages.
3. **Leftover project:** optionally delete the empty `ecotown.pages.dev` Pages project. Ask first.
4. **Custom domain:** optional, e.g. `play.deltaopslearning.com`. School filters may block `workers.dev`.
5. **Stripe paywall:** future work. Start from `docs/FUTURE-PAYWALL.md` and its open decisions.
6. **Merge:** the branch has not been merged to `main`.

## Gotchas
- **Blocked actions:** the safety checker blocked writing Worker secrets and deleting or re-creating the account workers.dev subdomain. Explain to the user and let them do it in the dashboard; don't work around it.
- **Renaming the subdomain:** use the dashboard (Workers & Pages → Your subdomain → Change). The API can't rename it in place.
- **After a rename:**
  - update the Access app domain;
  - check the Worker's workers.dev route is still enabled;
  - expect the user's device to cache "can't find server" for a while.
- **Outdated README section:** the README section "Put it on a secure website (Cloudflare Pages + login)" describes the older Pages approach and is historical now.
