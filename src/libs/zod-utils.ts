import { z } from 'zod';

export type PartialFormValidation<T> = { [key in keyof T]: z.ZodSchema<T[key]> };
