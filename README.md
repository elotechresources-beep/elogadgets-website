# EloGadgets.ng

A fast, responsive static storefront for EloGadgets.ng in Uyo, Nigeria. It introduces the business and its buy, sell and swap positioning, and provides directions to its confirmed shop address. No phone number, email, social profile, product stock, prices, warranty, repair service, backend or database has been supplied or invented.

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

* Business identity, confirmed shop address and directions query: [`business.js`](business.js).
* Main page content and metadata: [`index.html`](index.html).
* Theme tokens and responsive layout: [`styles.css`](styles.css).
* Theme persistence and accessible mobile navigation: [`script.js`](script.js).
* No EloGadgets logo or contact channel has been supplied. The header uses a text wordmark; imagery is illustrative and does not represent confirmed stock.

The map link searches the supplied address; it is not a verified map pin. There is no canonical URL because a production domain has not been confirmed.

## UI library and imagery

The site remains dependency-free static HTML/CSS/JS. Native accessible HTML controls preserve the existing architecture. Hero and product imagery are illustrative photos downloaded under the Unsplash License; they do not depict EloGadgets staff, premises or confirmed stock.

The confirmed address and directions are maintained in `business.js`.

## Business details to confirm

Store hours, phone, email, social links, warranty/returns, delivery, payment and swap terms, product stock, pricing, founder biography, photo publication permissions, and registered legal entity status are not confirmed and therefore are not claimed. The business name is used as a brand, not a claim of registered-company status.

## Codespace

The development container uses the Ubuntu base image with Node 22 and Git features. It forwards port 4173 and bootstraps the no-dependency npm project.
