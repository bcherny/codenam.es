# codenam.es ![](https://github.com/bcherny/codenam.es/workflows/ci/badge.svg)

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

## API

✅ means it's implemented, ☢️ means it's not (yet):

|     | Verb    | Route                                             | Description                   |
| --- | ------- | ------------------------------------------------- | ----------------------------- |
| ✅  | `GET`   | `/api/room/:id`                                   | Get a room                    |
| ✅  | `GET`   | `/api/user/:id`                                   | Get a user                    |
| ✅  | `PATCH` | `/api/room/:room_id/join/:user_id`                | Join a room                   |
| ✅  | `PATCH` | `/api/room/:room_id/state/:user_id`               | Mark a person as ready or not |
| ☢️  | `PATCH` | `/api/room/:room_id/guess/:user_id {word: 'FOO'}` | Guess word "FOO"              |
| ☢️  | `PATCH` | `/api/room/:room_id/finish-turn/:user_id`         | Finish your turn              |
| ✅  | `PATCH` | `/api/user/:user_id {name: 'foo'}`                | Change a person's name        |
| ✅  | `PATCH` | `/api/user/:user_id {pic: '❤️'}`                  | Change a person's emoji pic   |
| ✅  | `POST`  | `/api/room`                                       | Create a room                 |
| ✅  | `POST`  | `/api/user`                                       | Create a user                 |

## Stack

- create-react-app
- Express
- Postgres
- Heroku

## States

- room: NOT_STARTED (default) | IN_PROGRESS
- user_x_room: NOT_READY (default) | READY

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
    - colors (JSON-encoded 2D matrix of: "R", "B", "N", and "A")
    - revealed_colors (JSON-encoded 2D matrix of booleans)
    - words (JSON-encoded 2D matrix of strings)
    - current_turn (one of: "R", "B")
  - user
    - id (int)
    - user_id (string)
    - name (string)
    - profile pic? (string: emoji)
  - room_x_user
    - id (int)
    - room_id (int)
    - user_id (int)
    - role (one of: "ASKER", "GUESSER")
    - state (one of: "NOT_READY", "READY")

## DB Commands

### Updating the schema

1. Add a migration in prisma/migrations
2. Run it: `psql -h host -d dbname -U user -f ./prisma/migrations/2.sql`
3. Regenerate the Prisma model: `npx prisma generate`
