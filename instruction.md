# Media Caesa - Developer Instructions

## 🚀 How to Run Locally
1. **Open Terminal** in the project folder.
2. Run `npm run dev`.
3. Open the Localhost link (e.g. `http://localhost:5173`).

## 📱 Mobile Compatibility
- This project uses **Tailwind CSS**.
- Always use **Mobile First** classes (e.g., `text-sm md:text-lg`).
- **Full Screen**: Media pages (Stories/Games) should use `fixed inset-0 w-full h-full` to avoid browser chrome issues on phones.

## ➕ How to Add New Media
1. **Assets**: Create a folder in `public/assets/[feature-name]/` and put your images/sounds there.
2. **Page**: Create a new Component in `src/pages/[FeatureName].tsx`.
   - Use the `useSound` hook for audio.
   - Use `Framer Motion` for animations.
3. **Route**: Add the new route in `src/App.tsx`.
   - `<Route path="/new-feature" element={<NewFeature />} />`
4. **Card**: Add a card in `src/pages/Home.tsx` linking to the new route.

## 🐛 Debugging
- Run `npm run lint` to check for code errors.
- Run `npm run build` to verify production build.

## 📂 Project Structure
- `src/pages/` -> Your Game/Story Screens.
- `src/hooks/` -> Shared logic (like Audio).
- `public/assets/` -> Images and Static files.
