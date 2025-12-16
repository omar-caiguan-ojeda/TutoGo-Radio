import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-display text-tutonaranja mb-4">¡Ups! Página no encontrada</h2>
      <p className="text-slate-300 mb-8">Parece que te has perdido en el espacio radiofónico.</p>
      <Link 
        href="/"
        className="px-6 py-3 bg-tutonaranja text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
      >
        Volver al Inicio
      </Link>
    </div>
  )
}
