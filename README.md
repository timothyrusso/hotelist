<div align="center">
        <img src="./src/ui/assets/images/readme_logo.png" width="94" height="94" alt="HolidAI Icon" style="border-radius: 50%;">
    <h1>
            hotelist
    </h1>
</div>

hotelist is a simple and responsive mobile application built with Expo and React Native that allows users to browse, search, and view details of hotels from a remote API.

## Features

- 🔍 **Search & Filter** – Search hotels by name, filters by hotel rating and order by price, rating, or name.
- 📋 **Hotel List** – View a scrollable list of available hotels with brief info such as name, image, price, location and rating.
- 🧭 **Hotel Details** – Tap on a hotel to see full details including description, photos, location, and contact information.
- ⚡️ **Optimized UI** – Clean and lightweight UI built with performance and usability in mind.

## Tech Stack

- **Frontend**: [React Native with Expo](https://github.com/expo/expo)
- **Client State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Caching and Server State Management**: [Tanstack Query](https://github.com/TanStack/query)

## Screenshots

<table>
   <tr>
      <td><strong>Home page</strong><br><img src="src/ui/assets/screenshots/home_page.png" alt="Home Page"></td>
      <td><strong>Hotel details page</strong><br><img src="src/ui/assets/screenshots/hotel_details_page.png" alt="Trip Detail Page"></td>
   </tr>
   <tr>
      <td><strong>Filter page</strong><br><img src="src/ui/assets/screenshots/filter_page.png" alt="Home Page"></td>
      <td><strong>Gallery image modal</strong><br><img src="src/ui/assets/screenshots/gallery_image_modal.png" alt="Trip Detail Page"></td>
   </tr>
</table>

## Setup instructions (development build)

1. Install dependencies

   ```bash
   npm install
   ```

2. Build the app

   ```bash
    npx expo prebuild --clean
    npm run ios && npm run android
   ```

3. Run the app

   ```bash
    npm run start
   ```

## Setup instructions (Expo Go)

1. Install dependencies

   ```bash
   npm install
   ```

2. Run the app

   ```bash
    npx expo start
   ```

## Run unit tests

```bash
npm run test
```
