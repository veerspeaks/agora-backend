const { RtcTokenBuilder, RtcRole } = require('agora-token');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

// Your Agora app credentials
const appID = '0667a7d327224fb7b8c3856c507692ec';
const appCertificate = 'b85e6d3f2c0c4f1aba748e50344c7ff7';

app.use(cors());
app.use(express.json());

app.get('/getToken', (req, res) => {
  const channelName = req.query.channelName;
  const uid = parseInt(req.query.uid);
  
  if (!channelName || isNaN(uid)) {
    console.log('Invalid request parameters:', { channelName, uid });
    return res.status(400).json({ error: 'channelName and valid uid are required' });
  }

  try {
    // Set token expiration time (1 hour)
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Build the token
    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      RtcRole.PUBLISHER,
      privilegeExpiredTs
    );

    console.log('Token generated successfully:', {
      channelName,
      uid,
      tokenPreview: `${token.substring(0, 20)}...`,
      expiresIn: `${expirationTimeInSeconds} seconds`
    });

    res.json({ token });
  } catch (error) {
    console.error('Token generation failed:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Using App ID: ${appID}`);
});
