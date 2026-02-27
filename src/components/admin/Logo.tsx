/* eslint-disable */
const pacificoFontUrl = 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap'

export default function AdminLogo() {
  return (
    <>
      <style>{`@import url('${pacificoFontUrl}');`}</style>
      <div className="flex items-center justify-center gap-4">
        <img className="w-20 h-20 object-contain" src="/logo.png" alt="Logo" />
        <div className="flex flex-col justify-center">
          <span className="text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            Eva Hurtová, DiS.
          </span>
          <span className="text-xl" style={{ fontFamily: 'var(--font-body)' }}>
            registrovaná porodní asistentka
          </span>
        </div>
      </div>
    </>
  )
}
