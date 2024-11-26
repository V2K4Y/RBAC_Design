export const apiResponse = (status: string, message: string, data: any = null) => ({
    status,
    message,
    data,
  });