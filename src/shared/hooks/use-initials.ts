export function useInitials(email: string | null): string {
  if (!email) return '?'

  const localPart = email.split('@')[0]
  if (!localPart) return '?'

  const firstChar = localPart.charAt(0).toUpperCase()
  const lastChar = localPart.charAt(localPart.length - 1).toUpperCase()

  if (localPart.includes('.')) {
    const parts = localPart.split('.')
    return (
      (parts[0]?.charAt(0).toUpperCase() ?? '') +
      (parts[1]?.charAt(0).toUpperCase() ?? '')
    )
  }

  return firstChar === lastChar ? firstChar : firstChar
}
