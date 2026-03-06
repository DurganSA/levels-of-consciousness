export async function sendSubmissionEmail(submission: {
  id: string;
  created_at: string;
  name: string;
  email: string;
  votes: Record<string, number>;
  favorite_painting: string;
}): Promise<boolean> {
  try {
    // Format the votes for email body
    const votesText = Object.entries(submission.votes)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, level]) => `Painting ${letter}: Level ${level}`)
      .join('\n');

    const emailBody = `
New Exhibition Vote Submission

Name: ${submission.name}
Email: ${submission.email}
Submitted: ${new Date(submission.created_at).toLocaleString('en-GB')}

Consciousness Level Assignments:
${votesText}

Favorite Painting: ${submission.favorite_painting}
    `.trim();

    // TODO: Integrate with Resend API
    // For now, just log and return true
    console.log('Email would be sent:', emailBody);
    
    // When Resend is configured, uncomment and use:
    /*
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'katie@katiecoopercoaching.com',
        subject: `Exhibition Vote: ${submission.name}`,
        text: emailBody,
      }),
    });
    return response.ok;
    */
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}
