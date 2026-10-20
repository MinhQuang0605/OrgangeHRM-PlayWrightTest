import { faker } from "@faker-js/faker";
export interface UserProfile {
    firstName: string,
    middleName: string,
    lastName: string,
    jobTitle: string
}


export function randomProfileGenerate(): UserProfile {
    return {
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName(),
        jobTitle: faker.person.jobTitle()
    }
}
