export const MAX_FILTER_OPTIONS = 4;
export const PRODUCT_LIMIT = 21;

export const PRODUCT_ORDER_BY: Record<string, Record<string, string>> = {
  "price-asc": { current_price: "asc" },
  "price-desc": { current_price: "desc" },
  newest: { update_time: "desc" },
};

export const SORT_BY_OPTIONS = [
  { value: "", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-desc", label: "Price: High-Low" },
  { value: "price-asc", label: "Price: Low-High" },
];
