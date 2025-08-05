
export const submitFormResponse = async (formData) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.FORM_RESPONSES)
      .insert([
        {
          [FORM_FIELDS.BUSINESS_FOCUS]: formData.businessFocus,
          [FORM_FIELDS.WEEKLY_LEADS]: parseInt(formData.weeklyLeads) || 0,
          [FORM_FIELDS.AI_AGENT]: formData.aiAgent,
          [FORM_FIELDS.MONTHLY_BUDGET]: formData.monthlyBudget,
          [FORM_FIELDS.CREATED_AT]: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Error submitting form:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Form submission failed:', error)
    return { success: false, error: error.message }
  }
}

export const getFormResponses = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.FORM_RESPONSES)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching form responses:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to fetch form responses:', error)
    return { success: false, error: error.message }
  }
} 