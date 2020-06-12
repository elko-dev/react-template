# myapp

## Running Locally

In order to run the application you first need to download the firebase configuration.  That can be found here:

```https://console.firebase.google.com/u/2/project/<YOUR_APP_NAME>/settings/serviceaccounts/adminsdk```

Ensure it is named ```serviceAccountKey.json```

Once this is created, you can now run your application. myapp leverages batect to create a dockerized local environment. in order to run the application simply run:
```shell
./batect runLocal
```