import { booksApi } from "../../config/api/booksApi";
import { CreateBookAPIResponse } from "../../infrastructure/interfaces/create-book-api-response.interface";

export const createBook = async(formValues:any) => {

  try {
    const url = `/books/`;
    console.log("FormValues que mando!",formValues);
    const { data:resp } = await booksApi.post<CreateBookAPIResponse>(url,formValues);
    return resp;
  } catch (error) {
    throw new Error(`Something happend ${error}`);
  }
}