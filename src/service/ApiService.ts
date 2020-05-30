import { GraphQLClient } from 'graphql-request';

import { environment } from '../config/environment';
import { firebaseAuth } from '../config/auth.config';

export class ApiService {
  protected basePath: string = environment.apiBase;
  protected authToken: string = '';
  private graphQLClient = new GraphQLClient(this.basePath);

  public async authenticatedGqlQuery(query: string): Promise<any> {
    const authToken = await this.getAuthToken();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: authToken,
    };

    this.graphQLClient.setHeaders(headers);

    const response = await this.graphQLClient.request(query);
    return response;
  }

  private async getAuthToken(): Promise<string> {
    if (null !== firebaseAuth.currentUser) {
      return await firebaseAuth.currentUser.getIdToken();
    } else {
      return '';
    }
  }
}
