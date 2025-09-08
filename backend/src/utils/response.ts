import { Response } from 'express';
import { ApiResponse, PaginationResponse } from '@/types';

export class ResponseUtil {
  static success<T>(
    res: Response, 
    data?: T, 
    message?: string, 
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      ...(message && { message }),
      ...(data !== undefined && { data })
    };

    return res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data: T, message?: string): Response {
    return ResponseUtil.success(res, data, message, 201);
  }

  static error(
    res: Response, 
    error: string, 
    statusCode: number = 500
  ): Response {
    const response: ApiResponse = {
      success: false,
      error
    };

    return res.status(statusCode).json(response);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    pagination: PaginationResponse,
    message?: string
  ): Response {
    const response = {
      success: true,
      ...(message && { message }),
      data,
      pagination
    };

    return res.json(response);
  }
}

export const successResponse = ResponseUtil.success;
export const createdResponse = ResponseUtil.created;
export const errorResponse = ResponseUtil.error;
export const paginatedResponse = ResponseUtil.paginated;