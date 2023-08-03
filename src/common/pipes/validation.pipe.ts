import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
    Type,
} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
//This class is just a demo that won't be used anywhere else
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        console.log("ValidationPipe:", object)
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metatype: Type): boolean {
        const types: Type[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
