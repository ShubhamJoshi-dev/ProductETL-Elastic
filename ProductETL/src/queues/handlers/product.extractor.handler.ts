import { IProductPayload } from "../../interface/product.interface";
import productEtlLogger from "../../libs/logger.libs";

async function productExtractorHandler(message: Array<IProductPayload>) {
  try {
    console.log(message);
  } catch (err: any) {
    const errrorMessage = `Error in the Product Extractor Handler , Due To : ${JSON.stringify(
      err
    )}`;
    productEtlLogger.error(errrorMessage);
    throw new Error(errrorMessage);
  }
}

export default productExtractorHandler;
