'use client'

import React from 'react'

export default function Header() {
  return (
    <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center ai-pulse">
              <span className="text-3xl">🤖</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                نظام الرد الآلي بالذكاء الاصطناعي
              </h1>
              <p className="text-white/60 text-sm md:text-base">
                ردود احترافية وسريعة على رسائل البريد الإلكتروني
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              AI متصل
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
