import { API_URL } from "../../../utils/constants";

export const getPosts = async () => {
    try {
        const response = await fetch(`${API_URL}/api/posts`);
        const data = await response.json();
      //  console.log('data', data);
        return data;        
    } catch (error) {
        console.error('Error al obtener los posts', error);
        return null;
    }
}
