# codenam.es

> Play codenames online!

## Hacking on it

```sh
cd client
yarn
cd ..
yarn
yarn dev
```

## Running it in production

```sh
cd client
yarn
yarn build
cd ..
yarn
yarn start
```

## Stack

- create-react-app
- Express
- TODO: Heroku

## How the UI/UX works

- Screen #1: Homepage (url: /)
  - 2 buttons:
    - Create room:
      - On press:
        - POST /api/user, returns user ID (eg. 123) + store in LocalStorage
        - POST /api/room, returns room ID (eg. "a653g2b")
        - PATCH /api/room/(room ID)/join/(user ID)
        - Redirect to: /api/rooms/(room ID)
    - Join room:
      - On press: open input for room ID
      - On submit:
        - POST /api/user, returns user ID (eg. 123) + store in LocalStorage
        - PATCH /api/room/(room ID)/join/(user ID)
        - Redirect to: /api/room/(room ID)
- Screen #2: Room (url: /room/:room-id)

  - All clients poll (every 1s): GET /api/room/(room ID)
  - IF game state is "IN_PROGRESS", return React stuff for game
  - OTHERWISE, return React stuff for lobby
  - Lobby:
    - Max 4 players
    - Room ID in header
    - Enter name field
      - On submit: PATCH /api/user/(user ID)/name
    - Lobby showing players
    - Ready button
      - On press: PATCH /api/room/(room ID)/ready
        - If all players are ready:
          - Changes game state to "IN_PROGRESS"
  - ## Game:
    - Renders "GAME READY"

- Data model:
  - room
    - id (int)
    - room_id (string)
    - state (one of: "NOT_STARTED" by default, "IN_PROGRESS")
  - user
    - id (int)
    - name (string)
    - profile pic? (string: emoji)
  - room_x_user
    - id (int)
    - room_id (int)
    - user_id (int)
    - state (one of: "NOT_READY", "READY")

SELECT room_id from room_x_user WHERE user_id={user_id}
