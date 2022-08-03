import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from "class-validator"

import { isBlank } from "@src/util"

export const IsNotBlank = (validationOptions?: ValidationOptions) => {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isNotBlank",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, _args: ValidationArguments) { return !isBlank(value) },
            },
        })
    }
}
