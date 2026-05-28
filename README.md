# Grok Docs

Local documentation and articles site for Grok.

## Development

```bash
npm install
npm run dev
```

Vite will start on **http://localhost:5173** by default.

## Testing on your phone (same WiFi)

Because the server is configured with `host: true`, you can access it from other devices on your local network.

### Steps

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Find your computer's local IP address (macOS):
   ```bash
   # Most common for WiFi
   ipconfig getifaddr en0

   # If you're on Ethernet
   ipconfig getifaddr en1
   ```

   Or use:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

3. On your phone, open a browser and go to:
   ```
   http://YOUR-IP-ADDRESS:5173
   ```

   Example: `http://192.168.1.42:5173`

Vite will also print the "Network" URL automatically when the server starts.

### Notes

- Make sure your phone and computer are on the **same WiFi network**.
- If you can't connect, temporarily disable any VPN/firewall on your computer.
- For a more stable experience during testing, you can also run:
  ```bash
  npm run dev -- --host
  ```

## Production build

```bash
npm run build
npm run preview
```

## Tech

- React + Vite (JavaScript)
- React Router
- Emotion CSS (using the `css({})` + `cx()` pattern)
