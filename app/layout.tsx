import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'نظام الرد الآلي على الإيميلات بالذكاء الاصطناعي',
  description: 'نظام ذكي للرد على رسائل البريد الإلكتروني باستخدام تقنيات الذكاء الاصطناعي',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-arabic bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
