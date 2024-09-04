export type ProductsModel =  {
  description: string;
  category: string;
  subCategory: string;
  productType: string;
  ingramPartNumber: string;
  vendorPartNumber: string;
  upcCode: string;
  vendorName: string;
  endUserRequired: string;
  hasDiscounts: string;
  type: string;
  discontinued: string;
  newProduct: string;
  directShip: string;
  hasWarranty: string;
  replacementSku: string;
  authorizedToPurchase: string;
  links: Link[];
}

export type Link = {
  topic: string;
  href: string;
  type: string;
}
