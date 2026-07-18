# Security Policy

Thank you for helping keep AgriBridge AI and its users safe. This document explains which versions receive security updates and how to report a vulnerability responsibly.

## Supported Versions

AgriBridge AI is under active development. Security fixes are applied to the latest version on the `main` branch.

| Version | Supported          |
| ------- | ------------------ |
| `main` (latest) | :white_check_mark: |
| Older commits / tags | :x: |

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.** Publicly disclosing a vulnerability before it's fixed puts users — including farmers relying on this platform for real decisions — at risk.

Instead, report it privately using one of these methods:

1. **GitHub Security Advisories (preferred):** open a [private security advisory](https://github.com/Jai-Shankar1033/AgriBridge-AI/security/advisories/new). This lets us discuss and fix the issue privately before public disclosure.
2. **Email:** contact the maintainer directly (see the GitHub profile [@Jai-Shankar1033](https://github.com/Jai-Shankar1033) for contact details) with the subject line `[SECURITY] AgriBridge AI — <short description>`.

### What to include in your report

To help us triage and fix the issue quickly, please include:

- A clear description of the vulnerability and its potential impact
- Steps to reproduce (proof-of-concept code, if applicable)
- The affected component (e.g. frontend, backend/API, Firebase auth flow, a specific route or file)
- Any suggested mitigation, if you have one

### What to expect

- **Acknowledgment:** we aim to acknowledge new reports within **3 business days**.
- **Assessment:** we'll investigate and let you know whether it's confirmed, and give a rough sense of severity and timeline.
- **Fix and disclosure:** once a fix is ready, we'll coordinate with you on disclosure timing. We ask that you give us reasonable time to patch before any public disclosure.
- **Credit:** with your permission, we're happy to credit you in the release notes or changelog for responsibly disclosed issues.

## Scope

Security reports are welcome for issues such as:

- Authentication/authorization bypass (including Firebase Auth integration and JWT/OTP flows)
- Exposure of secrets, API keys, or credentials in the codebase
- Injection vulnerabilities (SQL/NoSQL injection, XSS, command injection, etc.)
- Insecure direct object references / broken access control on API routes
- Server-side request forgery (SSRF)
- Sensitive data exposure (farmer personal data, location data, financial/payment data)
- Dependency vulnerabilities with a demonstrable exploit path in this project

### Out of scope

- Issues requiring physical access to a user's device
- Social engineering attacks against maintainers or contributors
- Denial-of-service via brute force without a novel amplification vector
- Vulnerabilities in third-party services we depend on (Firebase, payment gateways, satellite/weather APIs) — please report those directly to the relevant vendor. If a misconfiguration on our end enables the issue, that's in scope.
- Best-practice suggestions without a demonstrated security impact (these are welcome as a normal GitHub issue or PR instead)

## Security Best Practices for Contributors

If you're contributing code, please help keep the project secure:

- **Never commit secrets.** API keys, Firebase config secrets, database credentials, and `.env` files must never be committed. Use `.env.example` for placeholders.
- **Validate and sanitize all user input** on both frontend and backend, especially anything reaching the database or an external API.
- **Keep dependencies up to date** and avoid introducing packages with known vulnerabilities — check `npm audit` before submitting a PR that adds dependencies.
- **Follow the principle of least privilege** for any new API routes, Firebase security rules, or database access patterns.
- **Be cautious with file uploads** (e.g. crop images for Plant Doctor / disease detection) — validate file type and size, and never trust client-supplied filenames or paths.

## Questions

For non-security questions about the project, please use the normal [GitHub Issues](https://github.com/Jai-Shankar1033/AgriBridge-AI/issues) instead of this security process.
