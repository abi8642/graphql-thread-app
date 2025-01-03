import {prismaClient} from "../../lib/db";

const queries = {
    getUsers: async () => await prismaClient.user.findMany({})
};
const mutations = {
    createUser: async (_: any, { firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) => {
        const newUser = await prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password,
                salt: String(password),
            }
        });

        return newUser.id;
    }
};

export const userResolvers = { queries, mutations };