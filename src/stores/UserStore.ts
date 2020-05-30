import { User } from '../model/User';
import { UserService } from '../service/UserService';
import { firebaseAuth } from '../config/auth.config';
export class UserStore {
  private userService: UserService = new UserService();
  private user: User | null = null;

  public async setup(): Promise<void> {
    if (firebaseAuth.currentUser !== null) {
      const user: User = await this.userService.getAuthenticatedUser();
      this.user = user;
    }
  }

  public get isAuthenticated(): boolean {
    return !!firebaseAuth.currentUser;
  }

  public get currentUser(): User | null {
    return this.user;
  }

  public getAuthUser(): firebase.User | null {
    return firebaseAuth.currentUser;
  }

  public logout(): Promise<void> {
    this.user = null;
    return firebaseAuth.signOut();
  }

  public async login(email: string, password: string): Promise<User> {
    await firebaseAuth.signInWithEmailAndPassword(email, password);
    const user: User = await this.userService.getAuthenticatedUser();
    this.user = user;

    return user;
  }

  public googleLogin = async (): Promise<User> => {
    console.log('Attempting to login with google - need to implement');
    // try {
    //     await GoogleSignin.hasPlayServices();
    //     const userInfo = await GoogleSignin.signIn();
    //     // use Google credential to create/sign in on firebase
    //     const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken);
    //     await firebase.auth().signInWithCredential(credential);

    //     // get user if exists
    //     try {
    //         const user: User = await this.userService.getAuthenticatedUser();
    //         this.user = user;
    //         return user;
    //     } catch (error) {
    //         if (error[0].message === 'User Not Found') {
    //             //create a new user
    //             const user: User = await this.userService
    //                 .signUpAuthUser(userInfo.user.email, userInfo.user.givenName, userInfo.user.familyName,
    //                     Auth.currentUser.uid, Auth.currentUser.phoneNumber, Auth.currentUser.photoURL);
    //             this.user = user;
    //             return user;
    //         } else {
    //             throw (error);
    //         }
    //     }

    // } catch (error) {
    //     console.log(error);
    //     Alert.alert(JSON.stringify(error));
    // }
    return Promise.reject();
  };

  public async signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ): Promise<User> {
    const user: User = await this.userService.signUpUser(
      email,
      firstName,
      lastName,
      phoneNumber,
      password
    );

    await this.login(email, password);

    return user;
  }

  public async updateUser(): Promise<void> {
    const user: User = await this.userService.getAuthenticatedUser();
    this.user = user;
  }

  // public handleUpdatePassword = (email: string): void => {
  //     Auth.sendPasswordResetEmail(email)
  //         .then(() => {
  //             Alert.alert(`Update Password email sent to ${email}`);
  //         })
  //         .catch((error) => {
  //             alert(error);
  //         });
  // }
}
