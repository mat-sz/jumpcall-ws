# jumpcall-ws

WebSockets server for [jumpcall-web](https://github.com/mat-sz/jumpcall-web).

More details about the project are available in the [jumpcall-web](https://github.com/mat-sz/jumpcall-web) repository.

## Installation

Run `yarn install`, `yarn build` and then simply run `yarn start`. For development you can also run jumpcall-ws with live reload, `yarn dev`.

## Configuration

`dotenv-flow` is used to manage the configuration.

The following variables are used for the configuration:

| Variable          | Default value                  | Description                                                            |
| ----------------- | ------------------------------ | ---------------------------------------------------------------------- |
| `WS_HOST`         | `127.0.0.1`                    | IP address to bind to.                                                 |
| `WS_PORT`         | `5000`                         | Port to bind to.                                                       |
| `STUN_SERVER`     | `stun:stun.1.google.com:19302` | STUN server address.                                                   |
| `TURN_MODE`       | `default`                      | `default` for static credentials, `hmac` for time-limited credentials. |
| `TURN_SERVER`     | null                           | TURN server address.                                                   |
| `TURN_USERNAME`   | null                           | TURN username.                                                         |
| `TURN_CREDENTIAL` | null                           | TURN credential (password).                                            |
| `TURN_SECRET`     | null                           | TURN secret (required for `hmac`).                                     |
| `TURN_EXPIRY`     | `3600`                         | TURN token expiration time (when in `hmac` mode), in seconds.          |
