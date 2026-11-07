# Homepage Views Nautas

[![Discourse Theme](https://github.com/criptonautas/discourse-homepage-views-nautas/actions/workflows/discourse-theme.yml/badge.svg)](https://github.com/criptonautas/discourse-homepage-views-nautas/actions/workflows/discourse-theme.yml)

**ENGLISH** | [ESPAÑOL](README.es.md)

Maintained by Criptonautas. Not affiliated with or endorsed by Discourse (Civilized Discourse Construction Kit, Inc.).

Discourse theme component that lets each person choose how the community opens: **minimal** (Dumbcourse, text only), **normal** (the forum) or **anonist** (AI chat). Built for the [Criptonautas Android app](https://github.com/criptonautas/comunidad-criptonautas-app), where it shows a full-screen "Elige tu vista" on first launch.

## Requirements

- Discourse 2026.x.
- [discourse-phosphor-duotone-icons](https://github.com/criptonautas/discourse-phosphor-duotone-icons) for the option icons.
- For *simple*: Dumbcourse enabled in [discourse-dumb-nautas](https://github.com/satonotdead/discourse-dumb-nautas).
- For *anonist*: Discourse AI with the AI bot conversations page enabled.

## How it works

- The chooser shows once, full screen, when the community is opened at `/` and nothing was chosen yet. With `view_chooser_app_only` (default) only in the installed app (Android or PWA).
- Logged-out visitors also get a "Sign in with your account" button above the views. It opens core's `/login` (straight to the external login with `auth_immediately`), and they come back to the chooser signed in. With an SSO provider like Authentik, that one sign-in also covers every other app linked from the forum.
- After that, a launch at `/` goes straight to the chosen view. Only `/`, once per page load: notifications, shared links and other pages (`/latest`, `/custom`) open as usual, and group homepages only ever see *moderna* users.
- If the chosen view can't open (plugin off, no access, page gone), the choice is forgotten and the chooser opens again with a short notice and that option disabled, so nobody gets stuck on a broken view.
- The choice is stored per device, like core's interface options. People change it in **Preferences → Interface → View when opening the community**, or by opening `/?vista=elegir` (also works for anonymous visitors and from Dumbcourse).
- Colours come from the active palette, so light and dark follow the site. The logo is the site's small logo.

## Links to our other apps

Inside the app, links to the hosts in `app_subdomains` open in the same window with `?volver=<forum page>` added, instead of a Chrome overlay. Each of those hosts shows a small round button that brings people back to that exact forum page; the button and the host's `assetlinks.json` come from an nginx include that is installed on the server and is not part of this repo. Hosts not in the list (the CDN, auth, anything new) are never touched, and outside the app links behave as usual.

Only list hosts you fully control and that don't serve files uploaded by users: inside the app they open full screen, without an address bar.

## Settings

| Setting | Default | What it does |
|---|---|---|
| `view_chooser_app_only` | `true` | Show the chooser only in the installed app. Turn off to show it in the browser too. |
| `view_simple_url` | `/dumb` | Path of the *simple* view. Empty hides the option. |
| `view_anonist_url` | `/discourse-ai/ai-bot/conversations` | Path of the *anonist* view. Empty hides the option. |
| `app_subdomains` | our 9 app hosts | Hosts that open in the same window with a way back, inside the app. |

Copy is translatable from **Admin → Appearance → Themes → Homepage Views Nautas → Translations** (English and Spanish included).

## Development

```bash
pnpm install
pnpm lint
```

## License

MIT. See [LICENSE](LICENSE).

Text of this README under [CC BY-NC-SA 4.0](CC-BY-NC-SA-4.0.txt).
