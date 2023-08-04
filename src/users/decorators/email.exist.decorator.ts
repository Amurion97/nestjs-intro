import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {Injectable} from '@nestjs/common';
import {UsersService} from "../users.service";

@ValidatorConstraint({
    // name: 'isUserAlreadyExist',
    async: true
})
// @Injectable() // this is needed in order to the class be injected into the module
// @Injectable is not needed since we don't inject it into anything
export class IsEmailAlreadyExist implements ValidatorConstraintInterface {
    constructor(protected readonly usersService: UsersService) {
        // console.log("IsEmailAlreadyExist - usersService:", this.usersService);
    }

    async validate(text: string) {
        let isUsed = await this.usersService.checkUsedEmail(text)
        return !isUsed
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'Email ($value) is already used!';
    }
}