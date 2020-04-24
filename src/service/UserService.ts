import { User } from '../model/User';
import { request } from 'graphql-request';
import { ApiService } from './ApiService';
import { environment } from '../config/environment';
import { firebaseAuth } from '../config/auth.config'

const BASE_API: string = environment.apiBase;

export class UserService {
    private apiService = new ApiService();

    public async signUpUser(email: string, firstName: string, lastName: string, phoneNumber: string, password: string): Promise<User> {
        const mutationString: string = `
        mutation { signUpUser(
            email: "${email}"
            firstName: "${firstName}"
            lastName: "${lastName}"
            phoneNumber: "${phoneNumber}"
            password: "${password}"
          ) {
                user {
                    id
                    email
                    firstName
                    lastName
                    phoneNumber
                }
                errors {
                    message
                }
            }
        }
      `;

        return request(BASE_API, mutationString).then(data => {
            if (data.signUpUser.user === null || data.signUpUser.errors.length > 0) {
                throw (data.signUpUser.errors);
            }
            return new User(data.signUpUser.user);
        }
        );
    }

    public async getAuthenticatedUser(): Promise<User> {
        const query: string = `
        query { getUserByFirebaseId(
            id: "${firebaseAuth.currentUser!.uid}"
          ) {
                user {
                    id
                    email
                    firstName
                    lastName
                    phoneNumber
                }
                errors {
                    message
                }
            }
        }
      `;

        try {
            const response = await this.apiService.authenticatedGqlQuery(query);
            if (response.getUserByFirebaseId.user === null || response.getUserByFirebaseId.errors.length > 0) {
                throw (response.getUserByFirebaseId.errors);
            }
            return new User(response.getUserByFirebaseId.user);
        } catch (error) {
            throw (error);
        }
    }

    public async signUpAuthUser(email: string, firstName: string, lastName: string, authId: string,
        phoneNumber: string, photoUrl: string): Promise<User> {
        const mutationString: string = `
        mutation { signUpAuthorizedUser(
            email: "${email}"
            firstName: "${firstName}"
            lastName: "${lastName}"
            phoneNumber: "${phoneNumber}"
            authId: "${authId}"
            photoUrl: "${photoUrl}"
          ) {
                user {
                    id
                    email
                    firstName
                    lastName
                    phoneNumber
                }
                errors {
                    message
                }
            }
        }
      `;

        try {
            const response = await this.apiService.authenticatedGqlQuery(mutationString);
            if (response.signUpAuthorizedUser.user === null || response.signUpAuthorizedUser.errors.length > 0) {
                throw (response.signUpAuthorizedUser.errors);
            }
            return new User(response.signUpAuthorizedUser.user);
        } catch (error) {
            throw (error);
        }
    }
}