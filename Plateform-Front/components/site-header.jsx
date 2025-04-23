import Link from "next/link"

export default function SiteHeader() {
  return (
    <div className="w-full border-b bg-white">
      <div className="container mx-auto px-4 h-20 flex items-center justify-start">
        <Link href="/" className="flex items-center">
          <img src="/images/evalyo-logo.png" alt="Evalyo" className="h-16" />
        </Link>
      </div>
    </div>
  )
}

