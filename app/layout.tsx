import './globals.css'
export const metadata = { title: 'Rolluikenvoorjou', description: 'Rolluiken & Screens' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="nl"><body className="bg-gray-50 text-slate-900 antialiased">{children}</body></html>)
}
