import { ValidationError } from './errors';

export class Validator {
  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isStrongPassword(password: string): boolean {
    return password.length >= 8;
  }

  static isValidUUID(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }

  static isValidDate(date: string): boolean {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }

  static isValidTime(time: string): boolean {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  static validateRequired(fields: Record<string, any>): void {
    const missingFields: string[] = [];

    Object.entries(fields).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        missingFields.push(key);
      }
    });

    if (missingFields.length > 0) {
      throw new ValidationError(`Required fields missing: ${missingFields.join(', ')}`);
    }
  }

  static validateEmail(email: string, fieldName: string = 'email'): void {
    if (!email) {
      throw new ValidationError(`${fieldName} is required`);
    }
    
    if (!Validator.isEmail(email)) {
      throw new ValidationError(`${fieldName} must be a valid email address`);
    }
  }

  static validatePassword(password: string, fieldName: string = 'password'): void {
    if (!password) {
      throw new ValidationError(`${fieldName} is required`);
    }

    if (!Validator.isStrongPassword(password)) {
      throw new ValidationError(`${fieldName} must be at least 8 characters long`);
    }
  }

  static validateUUID(id: string, fieldName: string = 'id'): void {
    if (!id) {
      throw new ValidationError(`${fieldName} is required`);
    }

    if (!Validator.isValidUUID(id)) {
      throw new ValidationError(`${fieldName} must be a valid UUID`);
    }
  }

  static validateDate(date: string | Date, fieldName: string = 'date'): Date {
    if (!date) {
      throw new ValidationError(`${fieldName} is required`);
    }

    const parsedDate = new Date(date);
    
    if (isNaN(parsedDate.getTime())) {
      throw new ValidationError(`${fieldName} must be a valid date`);
    }

    return parsedDate;
  }

  static validateTime(time: string, fieldName: string = 'time'): void {
    if (!time) {
      throw new ValidationError(`${fieldName} is required`);
    }

    if (!Validator.isValidTime(time)) {
      throw new ValidationError(`${fieldName} must be in HH:MM format`);
    }
  }

  static validatePagination(page?: string, limit?: string) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;

    if (isNaN(pageNum) || pageNum < 1) {
      throw new ValidationError('Page must be a positive integer');
    }

    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      throw new ValidationError('Limit must be between 1 and 100');
    }

    return { page: pageNum, limit: limitNum };
  }
}