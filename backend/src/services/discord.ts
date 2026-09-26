export async function sendDiscordAlert(webhookUrl: string, title: string, details: string, color: number = 0xff0000) {
  if (!webhookUrl) return; // Silent skip if not configured

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title,
          description: details,
          color,
          timestamp: new Date().toISOString()
        }]
      })
    });
  } catch (err) {
    // Fail silently to not break main flows
    console.error('Failed to send discord alert:', err);
  }
}
