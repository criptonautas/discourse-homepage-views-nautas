# Homepage Views Nautas

[![Discourse Theme](https://github.com/criptonautas/discourse-homepage-views-nautas/actions/workflows/discourse-theme.yml/badge.svg)](https://github.com/criptonautas/discourse-homepage-views-nautas/actions/workflows/discourse-theme.yml)

[ENGLISH](README.md) | **ESPAÑOL**

Mantenido por Criptonautas. Sin afiliación ni respaldo de Discourse (Civilized Discourse Construction Kit, Inc.).

Componente de tema de Discourse para que cada persona elija cómo se abre la comunidad: **mínima** (Dumbcourse, solo texto), **normal** (el foro) o **anonist** (chat IA). Pensado para la [app Android de Criptonautas](https://github.com/criptonautas/comunidad-criptonautas-app), donde muestra «Elige tu vista» a pantalla completa la primera vez que se abre.

## Requisitos

- Discourse 2026.x.
- [discourse-phosphor-duotone-icons](https://github.com/criptonautas/discourse-phosphor-duotone-icons) para los iconos de cada opción.
- Para *simple*: Dumbcourse activado en [discourse-dumb-nautas](https://github.com/satonotdead/discourse-dumb-nautas).
- Para *anonist*: Discourse AI con la página de conversaciones del bot activada.

## Cómo funciona

- El selector aparece una vez, a pantalla completa, al abrir la comunidad por `/` sin haber elegido todavía. Con `view_chooser_app_only` (por defecto) solo en la app instalada (Android o PWA).
- Quien no inició sesión ve además un botón «entrar con tu cuenta» sobre las vistas. Abre `/login` del núcleo (directo al login externo con `auth_immediately`) y vuelve al selector con la sesión iniciada. Con un proveedor SSO como Authentik, ese único inicio de sesión sirve también para todas las demás apps enlazadas desde el foro.
- Desde entonces, abrir por `/` lleva directo a la vista elegida. Solo `/` y una vez por carga: notificaciones, enlaces compartidos y otras páginas (`/latest`, `/custom`) se abren como siempre, y las portadas por grupo solo reciben a quien usa *moderna*.
- Si la vista elegida no se puede abrir (plugin desactivado, sin acceso, página inexistente), se olvida la elección y el selector vuelve a abrirse con un aviso y esa opción desactivada, así nadie queda atrapado en una vista rota.
- La elección se guarda por dispositivo, como las opciones de interfaz del núcleo. Se cambia en **Preferencias → Interfaz → Vista al abrir la comunidad** o abriendo `/?vista=elegir` (sirve también sin sesión y desde Dumbcourse).
- Los colores salen de la paleta activa, así que el modo claro y oscuro siguen al sitio. El logo es el logo pequeño del sitio.

## Enlaces a nuestras otras apps

Dentro de la app, los enlaces a los dominios de `app_subdomains` se abren en la misma ventana con `?volver=<página del foro>`, en lugar de una capa de Chrome. Cada uno de esos dominios muestra un pequeño botón redondo que lleva de vuelta a esa misma página del foro; el botón y el `assetlinks.json` del dominio salen de un include de nginx que se instala en el servidor y no forma parte de este repo. Los dominios que no están en la lista (la CDN, auth, cualquiera nuevo) no se tocan nunca, y fuera de la app los enlaces funcionan como siempre.

Incluye solo dominios que controles por completo y que no sirvan archivos subidos por usuarios: dentro de la app se abren a pantalla completa, sin barra de direcciones.

## Ajustes

| Ajuste | Por defecto | Qué hace |
|---|---|---|
| `view_chooser_app_only` | `true` | Muestra el selector solo en la app instalada. Desactívalo para mostrarlo también en el navegador. |
| `view_simple_url` | `/dumb` | Ruta de la vista *simple*. Vacía oculta la opción. |
| `view_anonist_url` | `/discourse-ai/ai-bot/conversations` | Ruta de la vista *anonist*. Vacía oculta la opción. |
| `app_subdomains` | nuestros 9 dominios | Dominios que, dentro de la app, se abren en la misma ventana con botón para volver. |

Los textos se traducen en **Admin → Apariencia → Temas → Homepage Views Nautas → Traducciones** (inglés y español incluidos).

## Desarrollo

```bash
pnpm install
pnpm lint
```

## Licencia

MIT. Consulta [LICENSE](LICENSE).

Texto de este README bajo [CC BY-NC-SA 4.0](CC-BY-NC-SA-4.0.txt).
