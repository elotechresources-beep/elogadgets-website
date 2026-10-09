# EloGadgets.ng

A fast, responsive static storefront for EloGadgets.ng in Uyo, Nigeria. It supports gadget purchase, sale, swap and repair enquiries, plus nationwide delivery enquiries. Product imagery is illustrative; no live stock, prices, warranties or repair guarantees are claimed.

## Requirements and setup

Use Node.js 22 or newer and npm. In a Codespace, `.devcontainer/devcontainer.json` pins Node 22 and runs the bootstrap automatically.

```sh
npm install
npm run dev
```

Open the URL printed by the development server (port 4173). Alternatively run `make setup` and `make dev`.

## Checks and production build

```sh
npm run doctor     # environment and required-file doctor
npm run build      # validates metadata/core sections and copies static site to dist/
```

Equivalent Make targets are `make doctor` and `make build`. There is no separate linter, type checker or test framework because the project has no application dependencies or backend; the doctor checks runtime/configuration and the build verifies expected assets and page metadata. The build output can be published by any static hosting provider. No hosting project is configured in this repository.

## Editing the site

* Business identity, confirmed phone, email, social destinations, enquiry messages, services, categories, address and directions query: [`business.js`](business.js).
* Main page content and metadata: [`index.html`](index.html).
* Theme tokens and responsive layout: [`styles.css`](styles.css).
* Theme persistence and accessible mobile navigation: [`script.js`](script.js).
* No approved EloGadgets logo or favicon has been supplied. The header uses a text wordmark; imagery is illustrative and does not represent confirmed stock.

The map link searches the supplied address; it is not a verified map pin. There is no canonical URL because EloGadgets.ng has not been purchased or verified.

## UI library and imagery

The site remains dependency-free static HTML/CSS/JS. Native accessible HTML controls preserve the existing architecture. Hero and product imagery are illustrative photos downloaded under the Unsplash License; they do not depict EloGadgets staff, premises or confirmed stock.

WhatsApp links open a prefilled message for review and sending in WhatsApp. Email links open the visitor's email application. The static site does not send or store enquiries.

## Business details to confirm

Physical store opening hours, delivery terms, warranty/returns, payment and swap terms, product stock, pricing, repair guarantees, photo publication permissions, and registered legal entity status are not confirmed and therefore are not claimed. Online enquiries are available 24/7; this does not describe physical shop hours.

## Codespace

The development container uses the Ubuntu base image with Node 22 and Git features. It forwards port 4173 and bootstraps the no-dependency npm project.
