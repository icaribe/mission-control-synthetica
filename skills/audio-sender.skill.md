---
name: audio-sender
description: Send synthesized speech audio to a user in Telegram with consistent formatting and methodology.
---

# Audio Sender Skill

## Purpose

Provide a repeatable, reliable method for delivering synthesized speech as audio messages to a Telegram user, ensuring the audio is sent as a proper media attachment rather than a text path.

## When to Use

- Whenever you need to send a spoken response to a user via Telegram.
- To maintain consistency in audio format (Opus codec), language (Portuguese), and delivery method.
- When you want to avoid sending raw file paths as text and instead send the audio file directly.

## Step‑by‑Step Procedure

1. **Generate the speech**  
   Use the `tts` tool with the desired Portuguese text.  
   ```json
   {
     "channel": "telegram",
     "text": "<Portuguese text you want to speak>",
     "asVoice": true
   }
   ```
   This returns a `MEDIA:/tmp/tts-<random>/voice-<timestamp>.opus` path.

2. **Send the audio**  
   Use the `message` tool to deliver the generated file as a voice message:  
   ```json
   {
     "action": "send",
     "channel": "telegram",
     "target": "<user‑id>",
     "media": "<PATH_FROM_STEP_1>",
     "asVoice": true
   }
   ```
   - `asVoice: true` tells Telegram to treat the attachment as a voice message.
   - Do **not** embed the path in a textual message; send it directly as media.

3. **Cleanup (optional)**  
   After successful delivery you may delete the temporary file to free space:  
   ```bash
   rm "<PATH_FROM_STEP_1>"
   ```

## Example (complete flow)

```bash
# 1) Generate audio
tts_output=$(tts channel=telegram text="Olá Igor, tudo bem?" asVoice=true)
# Extract the MEDIA path from the tool response, e.g. /tmp/tts-abc/voice-12345.opus

# 2) Send the audio
message action=send channel=telegram target=7291761961 media=$tts_output asVoice=true

# 3) (Optional) Delete temporary file
rm $tts_output
```

## Best Practices

- **Always use `asVoice:true`** when you want the recipient to hear the message as an audio playback.
- **Never send the raw path as a text string**; always send it directly as a media attachment.
- **Keep the target user ID configurable** if you need to send to multiple chats.
- **Log the operation** in `MEMORY.md` or a dedicated `audio-sends.log` if you need audit trails.

## References

- `memory/2026-02-27.md` – Initial debugging and solution for audio path handling.
- Telegram Bot API documentation – `sendVoice` / `sendAudio` methods.