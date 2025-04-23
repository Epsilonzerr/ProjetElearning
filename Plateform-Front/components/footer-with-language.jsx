import Link from "next/link"

export default function FooterWithLanguage() {
  return (
    <footer className="mt-auto bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Institut supérieur du Génie Appliqué | Casablanca
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-600 hover:text-primary-blue">
              Conditions d&apos;utilisation
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-blue">
              Politique de confidentialité
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-blue">
              Contact
            </Link>
            <div className="relative">
              <select
                className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                defaultValue="fr"
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

