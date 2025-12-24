'use client'

import React, { useState, useEffect } from 'react'
import { Email } from './types'

interface EmailComposerProps {
  selectedEmail: Email | null
}

const replyTones = [
  { id: 'professional', name: 'رسمي', icon: '👔', description: 'لغة رسمية ومهنية' },
  { id: 'friendly', name: 'ودي', icon: '😊', description: 'لغة ودية ولطيفة' },
  { id: 'formal', name: 'تقليدي', icon: '📜', description: 'لغة تقليدية محترمة' },
  { id: 'brief', name: 'مختصر', icon: '⚡', description: 'رد قصير ومباشر' },
]

const replyTemplates: Record<string, Record<string, { subject: string; body: string }>> = {
  'استفسار': {
    'professional': {
      subject: 'رد: استفسار عن المنتج الجديد',
      body: `السيد/ة المحترم/ة،

شكراً لتواصلكم معنا والاستفسار عن منتجنا الجديد.

يسعدنا إفادتكم بأن منتجنا الجديد يتميز بالمواصفات التالية:
• جودة عالية ومعايير دولية
• ضمان شامل لمدة سنتين
• دعم فني على مدار الساعة
• أسعار تنافسية مع خيارات دفع مرنة

للحصول على عرض سعر مخصص، يرجى التواصل مع فريق المبيعات على الرقم: XXXX-XXX-XXXX

مع خالص التقدير،
فريق خدمة العملاء`
    },
    'friendly': {
      subject: 'رد: استفسار عن المنتج الجديد 🌟',
      body: `أهلاً وسهلاً! 👋

سعداء جداً بتواصلك معنا!

منتجنا الجديد رائع حقاً! إليك أهم المميزات:
✨ جودة ممتازة
✨ ضمان سنتين كاملتين
✨ فريق دعم متوفر دائماً لمساعدتك
✨ أسعار مناسبة للجميع

لو عندك أي سؤال ثاني، لا تتردد!

بانتظارك 💜`
    },
    'formal': {
      subject: 'رد على استفساركم الكريم',
      body: `بسم الله الرحمن الرحيم

حضرة السيد/ة الفاضل/ة،

تحية طيبة وبعد،

بالإشارة إلى استفساركم الكريم حول المنتج الجديد، يسرنا أن نحيطكم علماً بالتفاصيل التالية:

أولاً: المواصفات الفنية للمنتج وفق أعلى المعايير
ثانياً: الضمان الشامل لمدة عامين كاملين
ثالثاً: خدمة الدعم الفني المتاحة على مدار الساعة
رابعاً: خيارات السداد الميسرة

راجين أن نكون قد وفقنا في الإجابة على استفساركم.

وتفضلوا بقبول فائق الاحترام والتقدير`
    },
    'brief': {
      subject: 'رد: استفسار المنتج',
      body: `شكراً لتواصلك.

المنتج متوفر بسعر تنافسي مع ضمان سنتين.
للتفاصيل: XXXX-XXX-XXXX

مع التحية`
    }
  },
  'دعم فني': {
    'professional': {
      subject: 'رد: طلب دعم فني - تم استلام طلبك',
      body: `السيد/ة الكريم/ة،

شكراً لتواصلكم مع فريق الدعم الفني.

تم استلام طلبكم ورقم المتابعة: #TICKET-XXXX

لحل مشكلة تسجيل الدخول، يرجى اتباع الخطوات التالية:
1. مسح ذاكرة التخزين المؤقت للمتصفح
2. التأكد من صحة البريد الإلكتروني المسجل
3. استخدام خيار "نسيت كلمة المرور" لإعادة تعيينها

في حال استمرار المشكلة، سيتواصل معكم أحد المختصين خلال 24 ساعة.

فريق الدعم الفني`
    },
    'friendly': {
      subject: 'رد: نحن هنا لمساعدتك! 🛠️',
      body: `مرحباً! 👋

لا تقلق، سنحل المشكلة معاً!

جرب هذه الخطوات السريعة:
🔹 امسح ذاكرة المتصفح
🔹 جرب رابط "نسيت كلمة المرور"
🔹 تأكد من البريد الإلكتروني الصحيح

لو ما زبطت، راسلنا وبنتواصل معك مباشرة!

موجودين لمساعدتك 💪`
    },
    'formal': {
      subject: 'رد على طلب الدعم الفني',
      body: `بسم الله الرحمن الرحيم

حضرة المستخدم الكريم،

تحية طيبة وبعد،

نشير إلى طلبكم للدعم الفني ونفيدكم بأنه تم تسجيله تحت رقم: #TICKET-XXXX

نرجو التكرم باتباع الإرشادات التالية:
أولاً: إزالة ملفات التخزين المؤقت من المتصفح
ثانياً: التحقق من صحة بيانات الدخول
ثالثاً: استخدام خاصية استعادة كلمة المرور

وفي حال عدم تمكنكم من الوصول، سيتم التواصل معكم من قبل المختصين.

وتفضلوا بقبول فائق الاحترام`
    },
    'brief': {
      subject: 'رد: دعم فني',
      body: `تم استلام طلبك #TICKET-XXXX

جرب: مسح الكاش > نسيت كلمة المرور
سنتواصل معك خلال 24 ساعة.

الدعم الفني`
    }
  },
  'شكر': {
    'professional': {
      subject: 'رد: شكراً لتقديركم',
      body: `السيد/ة الكريم/ة،

نشكركم جزيل الشكر على كلماتكم الطيبة وتقديركم لخدماتنا.

رضاكم هو هدفنا الأول، ونسعى دائماً لتقديم أفضل تجربة ممكنة لعملائنا الكرام.

نتطلع لخدمتكم مجدداً قريباً.

مع خالص الشكر والتقدير،
فريق العمل`
    },
    'friendly': {
      subject: 'كلامك أسعدنا! 🌟',
      body: `يا هلا فيك! 💜

كلامك الحلو رفع معنوياتنا!
أنت عميل مميز ونحن محظوظين بثقتك.

دايماً موجودين لخدمتك!
شكراً من القلب 🙏✨`
    },
    'formal': {
      subject: 'شكر وتقدير على رسالتكم الكريمة',
      body: `بسم الله الرحمن الرحيم

حضرة السيد/ة الفاضل/ة،

تحية طيبة وبعد،

تلقينا رسالتكم الكريمة بمزيد من الشكر والامتنان.

إن ثقتكم الغالية هي وسام شرف نعتز به، ونؤكد لكم التزامنا الدائم بتقديم أرقى الخدمات.

داعين المولى عز وجل أن نكون عند حسن ظنكم دائماً.

وتفضلوا بقبول وافر الاحترام والتقدير`
    },
    'brief': {
      subject: 'شكراً لك!',
      body: `شكراً جزيلاً على كلماتك الطيبة!
سعداء بخدمتك دائماً.

مع التحية`
    }
  },
  'شراكة': {
    'professional': {
      subject: 'رد: طلب شراكة - نرحب بالتعاون',
      body: `السادة الكرام،

شكراً لاهتمامكم بالتعاون معنا.

نرحب بمناقشة فرص الشراكة المحتملة ونود الاطلاع على المزيد من التفاصيل حول:
• نبذة عن شركتكم وخدماتها
• نطاق الشراكة المقترح
• الأهداف المشتركة المتوقعة

يرجى اقتراح موعد مناسب لعقد اجتماع افتراضي أو حضوري لمناقشة التفاصيل.

في انتظار ردكم الكريم.

مع خالص التقدير،
قسم تطوير الأعمال`
    },
    'friendly': {
      subject: 'رد: فكرة الشراكة رائعة! 🤝',
      body: `أهلاً وسهلاً! 👋

فكرة الشراكة حماسية جداً!

نحب نعرف أكثر عنكم وعن أفكاركم للتعاون.
متى يناسبكم نحكي؟ نقدر نعمل اجتماع أونلاين سريع.

متحمسين للتعاون! 🚀💜`
    },
    'formal': {
      subject: 'رد على عرض الشراكة الكريم',
      body: `بسم الله الرحمن الرحيم

حضرات السادة الأفاضل،

تحية طيبة وبعد،

نشير إلى خطابكم الكريم بشأن الشراكة المقترحة، ويسرنا إبداء اهتمامنا بهذا التعاون.

نأمل التكرم بموافاتنا بالمعلومات التالية:
أولاً: نبذة تعريفية عن مؤسستكم الموقرة
ثانياً: تفاصيل الشراكة المقترحة
ثالثاً: الأهداف المرجوة من هذا التعاون

ونرجو تحديد موعد مناسب لعقد اجتماع لمناقشة آفاق التعاون.

وتفضلوا بقبول فائق الاحترام والتقدير`
    },
    'brief': {
      subject: 'رد: طلب شراكة',
      body: `شكراً لاهتمامكم.

نرحب بمناقشة الشراكة.
أرسلوا تفاصيل أكثر وموعد مناسب للاجتماع.

مع التحية`
    }
  },
  'شكوى': {
    'professional': {
      subject: 'رد: شكوى رقم #12345 - نعتذر ونتابع',
      body: `السيد/ة الكريم/ة،

نعتذر بشدة عن أي إزعاج سببه تأخر طلبكم.

تم تسجيل شكواكم تحت رقم: #COMPLAINT-XXXX
وسيتم التحقيق في أسباب التأخير فوراً.

الإجراءات المتخذة:
• التواصل مع شركة الشحن للتتبع الفوري
• متابعة الطلب وتحديد موقعه الحالي
• إبلاغكم بآخر المستجدات خلال 24 ساعة

كتعويض عن هذا التأخير، سنقدم لكم [قسيمة خصم/شحن مجاني] لطلبكم القادم.

نقدر صبركم وثقتكم.

خدمة العملاء`
    },
    'friendly': {
      subject: 'نعتذر جداً! سنحل المشكلة 🙏',
      body: `مرحباً 👋

والله نعتذر منك على هالتأخير!
حق لك تزعل ونحن معك.

خلاص سجلنا الشكوى وبنتابع الموضوع شخصياً.
بنرد عليك خلال 24 ساعة بالضبط.

وكتعويض، بنعطيك خصم على طلبك الجاي!

شكراً على صبرك 💜`
    },
    'formal': {
      subject: 'رد على شكواكم الكريمة',
      body: `بسم الله الرحمن الرحيم

حضرة السيد/ة الفاضل/ة،

تحية طيبة وبعد،

نشير إلى شكواكم المتعلقة بتأخر تسليم الطلب رقم #12345، ونعرب عن بالغ أسفنا لهذا الأمر.

تم تسجيل شكواكم تحت رقم: #COMPLAINT-XXXX
وقد باشرنا فوراً بالتحقيق في أسباب التأخير.

نلتزم بإفادتكم بنتائج المتابعة خلال 24 ساعة، مع تقديم التعويض المناسب.

راجين قبول اعتذارنا وداعين الله أن نكون عند حسن ظنكم.

وتفضلوا بقبول فائق الاحترام`
    },
    'brief': {
      subject: 'رد: شكوى - تم الاستلام',
      body: `نعتذر عن التأخير.
رقم الشكوى: #COMPLAINT-XXXX

سنتابع ونرد خلال 24 ساعة مع تعويض مناسب.

خدمة العملاء`
    }
  }
}

export default function EmailComposer({ selectedEmail }: EmailComposerProps) {
  const [selectedTone, setSelectedTone] = useState('professional')
  const [generatedReply, setGeneratedReply] = useState({ subject: '', body: '' })
  const [isGenerating, setIsGenerating] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (selectedEmail) {
      setGeneratedReply({ subject: '', body: '' })
    }
  }, [selectedEmail])

  const generateReply = () => {
    setIsGenerating(true)
    
    setTimeout(() => {
      if (selectedEmail) {
        const category = selectedEmail.category
        const templates = replyTemplates[category] || replyTemplates['استفسار']
        const template = templates[selectedTone] || templates['professional']
        
        setGeneratedReply({
          subject: template.subject,
          body: template.body
        })
      } else if (customInput.trim()) {
        // Generate based on custom input
        const detectedCategory = detectCategory(customInput)
        const templates = replyTemplates[detectedCategory] || replyTemplates['استفسار']
        const template = templates[selectedTone] || templates['professional']
        
        setGeneratedReply({
          subject: template.subject,
          body: template.body
        })
      }
      setIsGenerating(false)
    }, 1500)
  }

  const detectCategory = (text: string): string => {
    const lowercaseText = text.toLowerCase()
    if (lowercaseText.includes('شكوى') || lowercaseText.includes('مشكلة') || lowercaseText.includes('تأخر')) {
      return 'شكوى'
    }
    if (lowercaseText.includes('شكر') || lowercaseText.includes('ممتاز') || lowercaseText.includes('رائع')) {
      return 'شكر'
    }
    if (lowercaseText.includes('دعم') || lowercaseText.includes('مساعدة') || lowercaseText.includes('تسجيل')) {
      return 'دعم فني'
    }
    if (lowercaseText.includes('شراكة') || lowercaseText.includes('تعاون') || lowercaseText.includes('اجتماع')) {
      return 'شراكة'
    }
    return 'استفسار'
  }

  const copyToClipboard = () => {
    const fullReply = `الموضوع: ${generatedReply.subject}\n\n${generatedReply.body}`
    navigator.clipboard.writeText(fullReply)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 card-glow">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
          <span className="text-2xl">✨</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">مُنشئ الردود بالذكاء الاصطناعي</h2>
          <p className="text-white/50 text-sm">اختر النبرة المناسبة وأنشئ ردك</p>
        </div>
      </div>

      {/* Selected Email Preview */}
      {selectedEmail && (
        <div className="mb-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-indigo-400">📩</span>
            <span className="text-white/70 text-sm">الرد على رسالة من:</span>
            <span className="text-white font-medium">{selectedEmail.from}</span>
          </div>
          <p className="text-white/60 text-sm line-clamp-2">{selectedEmail.subject}</p>
        </div>
      )}

      {/* Custom Input (when no email selected) */}
      {!selectedEmail && (
        <div className="mb-6">
          <label className="block text-white/70 text-sm mb-2">أدخل نص الإيميل المراد الرد عليه:</label>
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="الصق هنا نص الإيميل الذي تريد الرد عليه..."
            className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 resize-none"
          />
        </div>
      )}

      {/* Tone Selection */}
      <div className="mb-6">
        <label className="block text-white/70 text-sm mb-3">اختر نبرة الرد:</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {replyTones.map((tone) => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(tone.id)}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                selectedTone === tone.id
                  ? 'bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border-purple-500/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="text-2xl mb-2">{tone.icon}</div>
              <div className="text-white font-medium text-sm">{tone.name}</div>
              <div className="text-white/40 text-xs mt-1">{tone.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateReply}
        disabled={isGenerating || (!selectedEmail && !customInput.trim())}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
          isGenerating || (!selectedEmail && !customInput.trim())
            ? 'bg-white/10 text-white/30 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]'
        }`}
      >
        {isGenerating ? (
          <>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-white rounded-full typing-dot"></span>
              <span className="w-2 h-2 bg-white rounded-full typing-dot"></span>
              <span className="w-2 h-2 bg-white rounded-full typing-dot"></span>
            </div>
            جاري إنشاء الرد...
          </>
        ) : (
          <>
            <span>🤖</span>
            إنشاء رد بالذكاء الاصطناعي
          </>
        )}
      </button>

      {/* Generated Reply */}
      {generatedReply.body && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2">
              <span>📝</span> الرد المُنشأ
            </h3>
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                copied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {copied ? (
                <>
                  <span>✓</span> تم النسخ
                </>
              ) : (
                <>
                  <span>📋</span> نسخ الرد
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="mb-3">
              <label className="text-white/50 text-xs">الموضوع:</label>
              <p className="text-white font-medium">{generatedReply.subject}</p>
            </div>
            <div>
              <label className="text-white/50 text-xs">نص الرد:</label>
              <pre className="text-white/90 whitespace-pre-wrap mt-2 font-arabic leading-relaxed">
                {generatedReply.body}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 font-medium hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center gap-2">
              <span>📤</span> إرسال الرد
            </button>
            <button 
              onClick={() => setGeneratedReply({ subject: '', body: '' })}
              className="flex-1 py-3 rounded-xl bg-white/10 text-white/70 border border-white/10 font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>🔄</span> إنشاء رد جديد
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
