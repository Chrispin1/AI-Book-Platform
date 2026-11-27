"use client"

import { Loader2 } from "lucide-react"

export default function LoadingOverlay() {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper loading-shadow">
        <div className="loading-animation">
          <Loader2 className="w-12 h-12 text-[#663820]" />
        </div>
        <div className="loading-title">Processing your book...</div>
        <div className="loading-progress">
          <div className="loading-progress-item">
            <span className="loading-progress-status"></span>
            <span>Analyzing PDF content</span>
          </div>
          <div className="loading-progress-item">
            <span className="loading-progress-status"></span>
            <span>Generating cover image</span>
          </div>
          <div className="loading-progress-item">
            <span className="loading-progress-status"></span>
            <span>Preparing voice assistant</span>
          </div>
        </div>
      </div>
    </div>
  )
}