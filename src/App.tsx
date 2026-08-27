/**
 * Vite entry wrapper.
 * In the Next.js build, the same <Home /> tree is rendered by src/app/page.tsx
 * inside src/app/layout.tsx — this file only exists so `vite build` keeps working.
 */
import Home from "./components/Home";

export default function App() {
  return <Home />;
}
