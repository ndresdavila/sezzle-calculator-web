# Setup

Node.js 22 and npm. The API should already be running on port 8080. See the API repository for that process.

## Development

```bash
npm install
npm run dev
```

Vite serves the UI at `http://localhost:5173` and forwards `/api` and `/health` to `http://localhost:8080`. The browser talks to the Vite origin, so CORS is not involved in the default setup.

## Environment

| Variable | Default | Meaning |
| --- | --- | --- |
| `VITE_API_BASE_URL` | empty | Prefix for API calls. Empty means same origin. |

Vite inlines this value at build time. The Docker image leaves it empty and nginx proxies `/api` to the `api` service.

## Production bundle

```bash
npm run build
npm run preview
```

`preview` does not proxy to the API. For a real two-process setup, use Docker or point `VITE_API_BASE_URL` at the API before building.

## Docker

Sibling checkouts:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
```

From GitHub, after the API repository is public:

```bash
docker compose up --build
```

The UI is published on port 3000. The API is also published on 8080 for curl.
