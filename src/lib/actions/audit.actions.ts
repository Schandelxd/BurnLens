'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { calculateAuditResults } from '@/lib/audit-engine'

const ToolStateSchema = z.object({
  id: z.string(),
  activeSeats: z.number().nonnegative(),
  inactiveSeats: z.number().nonnegative(),
  isEnterprise: z.boolean()
})

const AuditSchema = z.object({
  companySize: z.number().positive(),
  monthlyApiSpend: z.number().nonnegative(),
  toolDetails: z.record(ToolStateSchema),
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
  const results = calculateAuditResults(
    parsed.data.toolDetails,
    parsed.data.monthlyApiSpend,
    parsed.data.companySize
  )

  const { error } = await supabase.from('audits').insert({
    profile_id: user.id,
    company_size: parsed.data.companySize,
    monthly_api_spend: parsed.data.monthlyApiSpend,
    tool_details: parsed.data.toolDetails,
    gauge_score: results.gaugeScore,
    annual_savings: results.annualSavings,
    recommendations: results.recommendations,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, results }
}
