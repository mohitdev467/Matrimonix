// VideoCallScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MeetingProvider, MeetingConsumer } from '@videosdk.live/react-native-sdk';

const VideoCallScreen = ({ route }) => {
  const { meetingId } = route.params;

  return (
    <MeetingProvider
      config={{
        meetingId: meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: 'User',
      }}
      token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhYzlmNDkxYS1mYzUzLTRhOTEtYTJjYy04MGM5NjRkNTQxMmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc0NzM3NjQ2MywiZXhwIjoxOTA1MTY0NDYzfQ.UN2Vw4v3PEhMCXIkgrVsJMi8HB5au9MbyUdyMLpCncI"}
    >
      <MeetingConsumer>
        {({ join, leave }) => {
          useEffect(() => {
            join();
            return () => {
              leave();
            };
          }, []);
          return <View style={styles.container}>{/* Your Video UI Components */}</View>;
        }}
      </MeetingConsumer>
    </MeetingProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VideoCallScreen;
