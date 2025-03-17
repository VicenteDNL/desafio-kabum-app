export function formatDocmentToRequest(document: string) {
  return document.replace(/[^\d]/g, "");
}
