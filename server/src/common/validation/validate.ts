import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BaseResponse } from '../reporter/base.response';

export const validateIt = async <T>(data, classType: ClassConstructor<T>, groups: any): Promise<T> => {
  if (!data) {
    throw BaseResponse.ValidationError('Request body should be object');
  }
  
  const classData = plainToClass(classType, data as T, {
    excludeExtraneousValues: false,
  });
  
  console.log(66, classData);
  
  const errors = await validate(classData as any, { groups, whitelist: true });
  console.log(88, errors);
  
  if (!errors || errors.length === 0) return classData;
  
  throw BaseResponse.ValidationError(errors);
};
