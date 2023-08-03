import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
//to use this, @Public before any proper method
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
