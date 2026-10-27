# Contact Actions Implementation Plan

> Execute inline in the current workspace. The user authorized completing the contact actions using the available information.

**Goal:** Make the site's contact actions usable without an unprovided newsletter or email delivery service.

**Architecture:** Keep HTML, CSS, vanilla JavaScript and native Web Components. A contact form component prepares a WhatsApp message; the visitor confirms sending in WhatsApp. Keep the existing phone number and email address.

**Constraints:** Brazilian Portuguese copy, BEM classes, existing tokens and 1280px/890px/600px breakpoints. No dependencies or external messaging from the development session.

## Tasks

- [x] Replace the footer newsletter with a WhatsApp contact invitation and actionable email/phone links.
- [x] Turn the contact cards into native links, including the existing address on Maps.
- [x] Add the contact form component with native and custom validation, encoded field values, honest status text, a fallback link and preserved input.
- [x] Add a disabled submit and direct-contact instructions when JavaScript is unavailable.
- [x] Update the README contact behavior and list the information still requiring business confirmation.
- [x] Verify actual browser behavior, popup blocking, special characters, optional fields, desktop/tablet/mobile layouts, shared footers and console errors.

## Verification

Run `/tmp/techpro-contact-check.cjs` with the installed Playwright browser; intercept external URLs so checks never send messages. Confirm encoded names, phone, email, customer type and multiline descriptions, failed validation and recovery. Inspect screenshots at 1440px, 768px and 390px. Run `git diff --check` and review the final diff.

Result: browser checks passed at 1440px, 1024px, 768px, 390px and 320px with no horizontal overflow or console errors. All seven page footers passed; popup blocking, exceptions, validation recovery, accents, special characters and the JavaScript-disabled fallback passed. No real messages were sent. The design detector returned no findings. Reviewed the diff and desktop, tablet and mobile screenshots.
