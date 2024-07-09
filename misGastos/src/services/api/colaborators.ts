import { API_URL } from "../../../utils/constants";

export const getColaborators = async () => {
    try {
        const response = await fetch(`${API_URL}/api/colaborators`);
        const data = await response.json();
      //  console.log('data', data);
        return data;        
    } catch (error) {
        console.error('Error al obtener los Colaborators', error);
        return null;
    }
}
