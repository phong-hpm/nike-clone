export const PRODUCT_LIMIT = 21;

export const PRODUCT_ORDER_BY: Record<string, Record<string, string>> = {
  "price-asc": { current_price: "asc" },
  "price-desc": { current_price: "desc" },
  newest: { update_time: "desc" },
};
