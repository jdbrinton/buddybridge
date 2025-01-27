# BuddyBridge

Find your friends on other social media platforms!

## Getting Started

First, install all the dependences with:

```bash
npm install
```

## Building

### Build for Web (Limited Functionality)

BuddyBridge needs to run natively to be able get around browser same-origin policy (SOP) restrictions. You can build the app for web, but the app cannot connect to your social media accounts. So, the app for web simply becomes the apps public information page. To create a production version of your app in the `docs` folder:

```bash
npm run build
```

### Build for Mobile

BuddyBridge uses CapacitorJS to build for mobile (android and iOS).

[TODO]

### Build for Desktop

BuddyBridge uses ElectronJS to build for desktop (linux, windows, mac)

[TODO]

## Debugging

### Debug on Desktop (Full Functionality)

To debug in Electron, in one terminal run:

```bash
npm run build:watch
```

in another terminal:

```bash
npx cap open electron
```

### Debug in Browser (Limited Functionality)

To debug in your web browser run:

```bash
npm run dev -- --open
```

## Favicon

https://favicon.io/favicon-generator/

This favicon was generated using the following font:

- Font Title: Wendy One
- Font Author: undefined
- Font Source: https://fonts.gstatic.com/s/wendyone/v18/2sDcZGJOipXfgfXV5wgDb2-4C7wFZQ.ttf
- Font License: undefined)
- Text: BB
- Font Color: #FFFFFF
- Background Color: #0D0
- Background: Rounded
- Font Family: Wendy One
- Font Variant: Regular 400 Normal
- Font Size: 90

# TODO

"Go!" button on home page is relative, not absolute like top nav. Maybe this doesn't matter.

Electron doesn't seem to ever close which leads to system memory loss



