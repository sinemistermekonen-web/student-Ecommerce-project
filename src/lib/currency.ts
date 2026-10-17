export function formatPrice(price: number): string{
    return new Intl.NumberFormat('en-ET', {
        style: "currency",
        currency: "ETB",
        maximumFractionDigits: 2,
    }).format(price);
}