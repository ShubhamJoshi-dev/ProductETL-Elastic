function transformAPIPayload(payload) {
  if (!Array.isArray(payload)) {
    return [];
  }

  const transformed = payload.map((item) => {
    return {
      productId: item.id,
      productName: item.title,
      productDescription: item.description,
      productPrice: item.price,
      productCategory: item.category,
      productImages: item.images,
    };
  });

  return transformed;
}

export { transformAPIPayload };
