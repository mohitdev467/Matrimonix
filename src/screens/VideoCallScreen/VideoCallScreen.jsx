import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import RtcEngine, { RtcRemoteView, RtcLocalView, VideoRenderMode } from 'react-native-agora';

const APP_ID = 'b2834fda678244bc862b969944234117';
const CHANNEL_NAME = 'testchannel';
const TEMP_TOKEN = '007eJxTYDBlmTfHoGN21n6tLI57Vh1OrpdVcrMjnJhSTJn/rWLr/aXAkGRkYWySlpJoZm5hZGKSlGxhZpRkaWZpaWJiZGxiaGh+6qpWRkMgI0NajQoLIwMEgvhcDL6JJUWZufl5mRUMDAD1eh4j';

const VideoCallScreen = () => {
  const [engine, setEngine] = useState(null);
  const [joined, setJoined] = useState(false);
  const [peerIds, setPeerIds] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
      }

      const rtcEngine = await RtcEngine.create(APP_ID);
      await rtcEngine.enableVideo();
      setEngine(rtcEngine);

      rtcEngine.addListener('UserJoined', (uid) => {
        if (!peerIds.includes(uid)) setPeerIds([...peerIds, uid]);
      });

      rtcEngine.addListener('UserOffline', (uid) => {
        setPeerIds(peerIds.filter(id => id !== uid));
      });

      rtcEngine.addListener('JoinChannelSuccess', () => {
        setJoined(true);
      });

      await rtcEngine.joinChannel(TEMP_TOKEN, CHANNEL_NAME, null, 0);
    };

    init();

    return () => {
      if (engine) {
        engine.leaveChannel();
        engine.destroy();
      }
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {joined ? (
        <>
          <RtcLocalView.SurfaceView
            style={{ flex: 1 }}
            channelId={CHANNEL_NAME}
            renderMode={VideoRenderMode.Hidden}
          />
          {peerIds.map(uid => (
            <RtcRemoteView.SurfaceView
              key={uid}
              style={{ flex: 1 }}
              uid={uid}
              channelId={CHANNEL_NAME}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          ))}
        </>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 100 }}>Joining...</Text>
      )}
    </View>
  );
};

export default VideoCallScreen;
