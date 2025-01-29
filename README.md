
```markdown
# AromaShooter3 VR Test

This project explores the integration of the AromaShooter 3 with VR experiences, specifically utilizing the Meta Quest 2 headset. It was developed using equipment from the VR lab at the University of Coimbra by Marcelo Coelho, under the supervision of Professor Jorge Cardoso, and was completed in January 2025.

## How to Run the Server

### Prerequisites
- **Node.js** must be installed on your machine. [Download and install Node.js here](https://nodejs.org/).

### Running the Server
1. Open a command console in the project directory.
2. Install dependencies by running:
   ```bash
   npm install
   ```
3. Start the server by running:
   ```bash
   npm start server.js
   ```

When the server starts, it will:
- Generate a self-signed SSL certificate, displaying the message:
  ```
  Self-signed certificate generated successfully.
  ```
  This certificate is essential for running the web program in HTTPS, as the Meta Quest 2 only supports HTTPS pages.
- Show the following message:
  ```
  HTTPS Server running at https://x.x.x.x:3006/
  ```
  Replace `x.x.x.x` with your server’s local IP address.

### Accessing the Webpage on the Meta Quest 2
- Make sure the Meta Quest 2 is connected to the same network as the server.
- Open the displayed URL (`https://x.x.x.x:3006/`) in the browser on the headset.
- Since the certificate is self-signed, you’ll see a security warning:
  - Click **Advanced Settings**.
  - Proceed to the website despite the warning.
  - Note: This is safe because the webpage is hosted locally on your server.

You can now interact with the webpage via the VR headset.

---

## Connecting the AromaShooter 3

### Overview of the AromaShooter 3
The AromaShooter 3 uses a cartridge system with six slots, each capable of holding a different scent. For this specific test, the slots should be filled as follows:
- **Slot 1:** Coffee
- **Slot 2:** Orange
- **Slot 3:** Lemon
- **Slot 4:** Rose
- **Slot 5:** Chocolate

### Setting Up the AromaShooter 3
1. Plug the AromaShooter 3 into a power source.
2. Connect to its Wi-Fi network from your computer or mobile device:
   - The network is identifiable by its serial number (e.g., `ASN2A5216`).
   - Password: `aromajoin@1003`
3. Open a web browser and navigate to:
   ```
   http://192.168.1.1/
   ```
4. Choose your local Wi-Fi network and enter its password.
5. Wait approximately 30 seconds for the AromaShooter to connect to the network.
6. Once connected, note the AromaShooter’s IP address—you’ll need it to send requests.

### Sending HTTP Requests to the AromaShooter
- The IP address for sending HTTP requests is defined in `server.js` (line 95):
  ```
  http://asn3a01177.local:1003
  ```

### Additional Notes
- Ensure the server, AromaShooter 3, and Meta Quest 2 are all on the same Wi-Fi network to enable seamless interaction.
- For more details about the AromaShooter 3 HTTP API, refer to the [official AromaJoin README](https://github.com/markcoelho/aromashooter3_vr_test/blob/main/official_aromajoin_README.md).

---

## Troubleshooting
- If the headset cannot access the server URL:
  - Verify the server’s IP address matches the displayed URL.
  - Ensure all devices are on the same Wi-Fi network.
- If the AromaShooter fails to connect to Wi-Fi:
  - Revisit the setup steps and check the Wi-Fi credentials.
  - Look for interference or weak Wi-Fi signals.

With the server, VR headset, and AromaShooter 3 all connected, you’re ready to explore integrating scents into VR experiences. Enjoy experimenting!
```

Let me know if you need further edits!
