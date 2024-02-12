
export const fetcher = async (...args: Parameters<typeof fetch>): Promise<any> => {
    try{
        const response = await  fetch(...args);
        return await response.json(); //extract response
    } catch (err: any) {
        return new Error("@fetcher error",err.message);
    }
  
}