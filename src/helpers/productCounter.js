export function plusAmount (amount) {
  amount <= 50 ? amount += 1 : amount = 50
  return amount
}
export function minusAmount (amount) {
  amount > 1 ? amount -= 1 : amount = 1
  return amount
}
