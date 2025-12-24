'use client'

import { useState } from 'react'
import EmailComposer from '@/components/EmailComposer'
import EmailList from '@/components/EmailList'
import Header from '@/components/Header'
import { Email } from '@/components/types'

export default function Home() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [activeTab, setActiveTab] = useState<'inbox' | 'compose'>('inbox')

  const sampleEmails: Email[] = [
    {
      id: '1',
      from: 'أحمد محمد',
      email: 'ahmed@example.com',
      subject: 'استفسار عن المنتج الجديد',
      body: 'السلام عليكم،\n\nأود الاستفسار عن المنتج الجديد الذي أعلنتم عنه مؤخراً. هل يمكنكم إعطائي مزيد من التفاصيل حول المواصفات والسعر؟\n\nشكراً لكم.',
      date: '2024-01-15',
      read: false,
      category: 'استفسار'
    },
    {
      id: '2',
      from: 'سارة علي',
      email: 'sara@example.com',
      subject: 'طلب دعم فني',
      body: 'مرحباً،\n\nواجهتني مشكلة في تسجيل الدخول إلى حسابي. أرجو المساعدة في حل هذه المشكلة في أقرب وقت.\n\nمع التحية.',
      date: '2024-01-14',
      read: true,
      category: 'دعم فني'
    },
    {
      id: '3',
      from: 'خالد العمري',
      email: 'khaled@example.com',
      subject: 'شكر وتقدير',
      body: 'أهلاً وسهلاً،\n\nأود أن أشكركم على الخدمة الممتازة التي قدمتموها. كان التعامل معكم تجربة رائعة.\n\nمع خالص الشكر والتقدير.',
      date: '2024-01-13',
      read: true,
      category: 'شكر'
    },
    {
      id: '4',
      from: 'فاطمة الزهراء',
      email: 'fatima@example.com',
      subject: 'طلب شراكة',
      body: 'السلام عليكم ورحمة الله وبركاته،\n\nنحن شركة متخصصة في التسويق الرقمي ونود مناقشة فرص الشراكة معكم.\n\nهل يمكننا ترتيب اجتماع لمناقشة التفاصيل؟\n\nمع التحية.',
      date: '2024-01-12',
      read: false,
      category: 'شراكة'
    },
    {
      id: '5',
      from: 'محمد السعيد',
      email: 'mohamed@example.com',
      subject: 'شكوى - تأخر في التسليم',
      body: 'السلام عليكم،\n\nأود التقدم بشكوى بخصوص تأخر تسليم طلبي رقم #12345. كان من المفترض وصوله قبل أسبوع ولم يصل حتى الآن.\n\nأرجو متابعة الموضوع.\n\nشكراً.',
      date: '2024-01-11',
      read: false,
      category: 'شكوى'
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'inbox'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            📬 صندوق الوارد
          </button>
          <button
            onClick={() => setActiveTab('compose')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'compose'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            ✉️ إنشاء رد جديد
          </button>
        </div>

        {/* Main Content */}
        {activeTab === 'inbox' ? (
          <div className="grid lg:grid-cols-2 gap-6">
            <EmailList 
              emails={sampleEmails} 
              selectedEmail={selectedEmail}
              onSelectEmail={setSelectedEmail}
            />
            <EmailComposer selectedEmail={selectedEmail} />
          </div>
        ) : (
          <EmailComposer selectedEmail={null} />
        )}
      </div>
    </main>
  )
}
