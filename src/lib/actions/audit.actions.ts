'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { calculateAuditResults } from '@/lib/audit-engine'

const AuditSchema = z.object({
  companySize: z.number().positive(),
  apiSpend: z.number().nonnegative(),
  tools: z.object({
    cursor: z.boolean(),
    githubCopilot: z.boolean(),
    claude: z.boolean(),
    chatgpt: z.boolean(),
  }),
  inactiveSeats: z.number().nonnegative(),
})

export async function saveAudit(data: z.infer<typeof AuditSchema>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized. Please log in to save audits.' }
  }

  const parsed = AuditSchema.safeParse(data)
  if (!parsed.success) {
    return { error: 'Invalid audit data format.' }
  }

  // Calculate deterministic results securely on the server
  const results = calculateAuditResults(parsed.data)

  const { error } = await supabase.from('audits').insert({
    profile_id: user.id,
    company_size: parsed.data.companySize,
    monthly_api_spend: parsed.data.apiSpend,
    tool_details: parsed.data.tools,
    gauge_score: results.score,
    annual_savings: results.annualSavings,
    recommendations: results.recommendations,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, results }
}
