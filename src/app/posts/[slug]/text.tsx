"use client"

import React, { useState, useEffect } from "react"
import postParse from "@/libs/parsing"

interface BodyTextProps {
  initialHtml: string
}
const BodyText: React.FC<BodyTextProps> = ({ initialHtml }) => {
  const [html, setHtml] = useState<React.ReactNode | null>(null)

  useEffect(() => {
    const parsedContent = postParse(initialHtml)
    setHtml(parsedContent)
  }, [initialHtml])

  return <div>{html}</div>
}

export default BodyText
