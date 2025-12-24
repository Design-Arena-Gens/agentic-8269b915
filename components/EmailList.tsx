'use client'

import React from 'react'
import { Email } from './types'

interface EmailListProps {
  emails: Email[]
  selectedEmail: Email | null
  onSelectEmail: (email: Email) => void
}

const categoryColors: Record<string, string> = {
  'استفسار': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'دعم فني': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'شكر': 'bg-green-500/20 text-green-400 border-green-500/30',
  'شراكة': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'شكوى': 'bg-red-500/20 text-red-400 border-red-500/30',
}

export default function EmailList({ emails, selectedEmail, onSelectEmail }: EmailListProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 card-glow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📥</span> الرسائل الواردة
        </h2>
        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm border border-indigo-500/30">
          {emails.length} رسالة
        </span>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
              selectedEmail?.id === email.id
                ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-purple-500/50'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                  selectedEmail?.id === email.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/70'
                }`}>
                  {email.from.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold ${email.read ? 'text-white/70' : 'text-white'}`}>
                      {email.from}
                    </h3>
                    {!email.read && (
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm">{email.email}</p>
                </div>
              </div>
              <span className="text-white/40 text-xs whitespace-nowrap">{email.date}</span>
            </div>
            
            <h4 className={`mt-3 text-sm ${email.read ? 'text-white/60' : 'text-white font-medium'}`}>
              {email.subject}
            </h4>
            
            <p className="text-white/40 text-sm mt-2 line-clamp-2">
              {email.body.substring(0, 100)}...
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs border ${categoryColors[email.category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                {email.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
