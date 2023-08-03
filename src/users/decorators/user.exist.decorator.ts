import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {Injectable} from '@nestjs/common';
import {UsersService} from "../users.service";

@ValidatorConstraint({
    // name: 'isUserAlreadyExist',
    async: true
})
// @Injectable() // this is needed in order to the class be injected into the module
// @Injectable is not needed since we don't inject it into anything
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
    constructor(protected readonly usersService: UsersService) {
        console.log("IsUserAlreadyExistConstraint - usersService:", this.usersService);
    }

    async validate(text: string) {
        const user = await this.usersService.findOneByUsername(text);
        return !user;
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'Username ($value) is already used!';
    }
}