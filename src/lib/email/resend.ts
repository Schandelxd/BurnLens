import { Resend } from 'resend'

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendAuditCompleteEmail(to: string, savings: number) {
  if (!resendClient) {
    console.warn('RESEND_API_KEY not found. Skipping email.')
    return
  }

  await resendClient.emails.send({
    from: 'Gauge <reports@updates.gauge.com>',
    to: [to],
    subject: `Your Gauge Audit is Complete - Save $${savings.toLocaleString()}/yr`,
    html: `
      <div>
        <h1>Gauge Audit Complete</h1>
        <p>We've found <strong>$${savings.toLocaleString()}</strong> in annualized savings for your team.</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">View your full report on the dashboard.</a></p>
      </div>
    `
  })
}
