
# AromaShooter3 VR Test

Quick demo video: https://youtu.be/hqzLuDA1dFw?si=NaUKUY2y-28JfXI3

<img src="https://github.com/user-attachments/assets/a0f3f3e2-1e01-4db2-80ee-b06681ff9e67" width="600"/>


This project explores the integration of the AromaShooter 3 for VR experiences with smell. It was developed using equipment from the VR lab at the University of Coimbra by Marcelo Coelho, under the supervision of Professor Jorge Cardoso, and was completed in January 2025.
The VR environment was developed in A-Frame.

## Quick summary:

Note:
I'm a design student, not an engineer, so my code may not be the most efficient. Feel free to use it, improve it, and modify it however you like!

This project works by running a server on a PC. This server will allow communication between the Aromashooter3 and the VR Headset. (server.js)

The 3D environment made in A-frame is hosted on the server, and not online (index.html)

The VR headset (client) sends the following request to the server:

```
function pedidocliente(slot, int, dur) {
    //console.log(slot, int, dur);
    const url = `https://${window.location.hostname}:3006/variables/${slot}/${int}/${dur}`;
    fetch(url)
      .then(response => response.text())
      .then(data => console.log(`HTTPS request to ${url} was successful: ${data}`))
      .catch(error => console.error(`Error sending HTTPS request to ${url}:`, error));
  }
```
Notice the 3 parameters: Slot, Intensity and Duration.
If the values are (1,100,1000), then aromashooter with emit the smell in slot 1 with 100% intensity for 1 second.

The server gets the request from the client:
```
appclient.get('/variables/:var1/:var2/:var3', (req, res) => {
    let { var1, var2, var3 } = req.params;
    console.log(`Received variables: ${var1}, ${var2}, ${var3}`);

    // Convert each variable to an array
    var1 = var1.split(',');
    var2 = var2.split(',');
    var3 = var3.split(',');

    console.log(`Converted variables to arrays: ${var1}, ${var2}, ${var3}`);

    // Call the diffuseAroma function with the array variables
    diffuseAroma(var1, var2, var3);

    res.send(`Variables received and processed: ${var1}, ${var2}, ${var3}`);
});
```
And sends the emission request to the aromashooter:
```
function diffuseAroma(channels, intensities, durations) {
    const now = Date.now();
    if (now - lastCallTime < 500) {
        return; // Cooldown period of 0.5 seconds
    }
    lastCallTime = now;

    const url = 'http://asn3a01177.local:1003/as2/diffuse';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channels: channels,
            intensities: intensities,
            durations: durations,
            booster: true
        })
    };

    // Fetch request to send the data
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
}
```

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
  This certificate is essential for running the web program in HTTPS, as for example the Meta Quest 2 only supports HTTPS pages.
- Show the following message:
  ```
  HTTPS Server running at https://x.x.x.x:3006/
  ```
   `x.x.x.x` should be the IP of your machine on your wifi network. You can confirm this by running ipconfig.

### Accessing the Webpage on the VR Headset
- Make sure the VR Headset is connected to the same network as the server.
- Open the displayed URL (`https://x.x.x.x:3006/`) in the browser on the headset.
- Since the certificate is self-signed, you’ll see a security warning:
  - Click **Advanced Settings**.
  - Proceed to the website despite the warning.
  - Note: This is safe because the webpage is hosted locally on your server.

You can now interact with the webpage via the VR headset.

---

## Connecting the AromaShooter 3

### Physical setup of the AromaShooter 3

#### Cartrige system:

<img src="https://github.com/user-attachments/assets/36e6bbf5-ed01-45fa-a0f3-fa877e47f579" width="600"/>


The AromaShooter 3 uses a cartridge system with six slots, each capable of holding a different scent. For this specific test, the slots should be filled as follows:
- **Slot 1:** Coffee
- **Slot 2:** Orange
- **Slot 3:** Lemon
- **Slot 4:** Rose
- **Slot 5:** Chocolate

#### Harness and Power:

The Aromashooter 3 can be attached to an action camera harness for better suited use in VR

Default harness:

<img src="https://github.com/user-attachments/assets/d635218c-2190-49ab-98fe-d805a7881a6b" width="300"/>

Assembled with correct attachment and plugged to a powerbank:

<img src="https://github.com/user-attachments/assets/4bb92b18-f530-4786-89fb-a0204af17078" width="300"/>

Example in use, powerbank clipped onto the harness:

<img src="https://github.com/user-attachments/assets/13a34a29-0bdb-4b77-a610-e42020faf388" width="300"/>



### Connection setup the AromaShooter 3
1. Plug the AromaShooter 3 into a power source.
2. Connect to its Wi-Fi network from your computer or mobile device:
   (if used in the University of Coimbra's VRLab, it should connect automatically to the wi-fi)
   - The network is identifiable by its serial number (e.g., `ASN2A5216`).
   - Password: `aromajoin@1003`
3. Open a web browser and navigate to:
   ```
   http://192.168.1.1/
   ```
5. Choose your local Wi-Fi network and enter its password.
6. Wait approximately 30 seconds for the AromaShooter to connect to the network.
7. Once connected, note the AromaShooter’s IP address—you’ll need it to send requests.

### Sending HTTP Requests to the AromaShooter
- The IP address for sending HTTP requests is defined in `server.js` (line 95):
  ```
  http://asn3a01177.local:1003
  ```
  The serial number used in the URL is written on its side:
<img src="https://github.com/user-attachments/assets/548b4a24-7af9-41b0-8e34-83e3fe2e35b5" width="300"/>


### Additional Notes
- For more details about the AromaShooter 3 HTTP API, refer to this copy of the [official AromaJoin README](https://github.com/markcoelho/aromashooter3_vr_test/blob/main/official_aromajoin_README.md).

---

## Troubleshooting
Your wi-fi network should be set to "private" on the machine where you are running the server. When it's set to "public" it usually doesn't communicate well with other devices.

- If the headset cannot access the server URL:
  - Verify the server’s IP address matches the displayed URL, including "HTTPS" at the start.
  - Ensure all devices are on the same Wi-Fi network.
- If the AromaShooter fails to connect to Wi-Fi:
  - Wait a little bit, sometimes it takes a while to connect. 
  - Revisit the setup steps and check the Wi-Fi credentials.

With the server, VR headset, and AromaShooter 3 all connected, you’re ready to explore integrating scents into VR experiences. Enjoy experimenting!

---

If you have any questions or suggestions, e-mail me: uc2017279510@student.uc.pt

