export function formatPhoneToRequest(document: string) {
  return document.replace(/[^\d]/g, "");
}
