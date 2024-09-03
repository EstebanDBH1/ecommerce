export function formatNumber(number) {
  return new Intl.NumberFormat("es-CO").format(number);
}
