export interface WhatsAppFollowUp {
  phone: string
  facilityName: string
  facilityPhone: string
  referralId: string
}

export function buildFollowUp24hMessage(params: WhatsAppFollowUp): string {
  return `Hi — you saved a breast screening location yesterday through Project Bloom.\n\n${params.facilityName}\n📞 ${params.facilityPhone}\n\nDid you get a chance to call them? Here is the number again if you need it.\n\nYou already know what to expect — you have already done the hard part.`
}

export function buildFollowUp7dMessage(params: WhatsAppFollowUp): string {
  return `Hi. We are thinking of you.\n\nYou booked a screening at ${params.facilityName}. How did it go?\n\nReply YES if you went, or NO if something came up — no judgment either way.\n\nWe are here whenever you are ready. 🌸`
}

export function openWhatsAppWithMessage(phone: string, message: string): void {
  const cleaned = phone.replace(/\D/g, '')
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${cleaned}?text=${encoded}`, '_blank')
}
