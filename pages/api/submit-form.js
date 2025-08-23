export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const formData = req.body

    // Validate required fields
    if (!formData.name || !formData.email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    // 1. Save to Supabase (existing functionality)
    const supabaseResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/submit-form`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    )

    if (!supabaseResponse.ok) {
      console.error('Supabase submission failed:', await supabaseResponse.text())
    }

    // 2. Send to Notion
    if (process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID) {
      try {
        const notionResponse = await fetch(
          `https://api.notion.com/v1/pages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
              'Notion-Version': '2022-06-28',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              parent: {
                database_id: process.env.NOTION_DATABASE_ID,
              },
              properties: {
                Name: {
                  title: [
                    {
                      text: {
                        content: formData.name,
                      },
                    },
                  ],
                },
                Email: {
                  email: formData.email,
                },
                'Business Focus': {
                  select: {
                    name: formData.business_focus || 'Not specified',
                  },
                },
                'Weekly Leads': {
                  select: {
                    name: formData.weekly_leads || 'Not specified',
                  },
                },
                'AI Agent Type': {
                  select: {
                    name: formData.ai_agent || 'Not specified',
                  },
                },
                'Monthly Budget': {
                  select: {
                    name: formData.monthly_budget || 'Not specified',
                  },
                },
                Status: {
                  select: {
                    name: 'New Lead',
                  },
                },
                Source: {
                  select: {
                    name: 'Rhea Chatbot',
                  },
                },
                'Submission Date': {
                  date: {
                    start: new Date().toISOString(),
                  },
                },
              },
            }),
          }
        )

        if (!notionResponse.ok) {
          console.error('Notion submission failed:', await notionResponse.text())
        } else {
          console.log('Lead successfully added to Notion')
        }
      } catch (notionError) {
        console.error('Error sending to Notion:', notionError)
        // Don't fail the entire request if Notion fails
      }
    }

    // 3. Send email notification (optional)
    if (process.env.SENDGRID_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: process.env.NOTIFICATION_EMAIL }],
                subject: 'New Lead from Rhea Chatbot',
              },
            ],
            from: { email: 'noreply@dantalksai.com', name: 'Dan Talks AI' },
            content: [
              {
                type: 'text/html',
                content: `
                  <h2>New Lead Captured! 🎉</h2>
                  <p><strong>Name:</strong> ${formData.name}</p>
                  <p><strong>Email:</strong> ${formData.email}</p>
                  <p><strong>Business Focus:</strong> ${formData.business_focus || 'Not specified'}</p>
                  <p><strong>Weekly Leads:</strong> ${formData.weekly_leads || 'Not specified'}</p>
                  <p><strong>AI Agent Type:</strong> ${formData.ai_agent || 'Not specified'}</p>
                  <p><strong>Monthly Budget:</strong> ${formData.monthly_budget || 'Not specified'}</p>
                  <p><strong>Source:</strong> Rhea Chatbot</p>
                  <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                `,
              },
            ],
          }),
        })

        if (!emailResponse.ok) {
          console.error('Email notification failed:', await emailResponse.text())
        }
      } catch (emailError) {
        console.error('Error sending email notification:', emailError)
        // Don't fail the entire request if email fails
      }
    }

    // 4. Google Analytics Tracking (Server-side)
    if (process.env.GA_MEASUREMENT_ID && process.env.GA_API_SECRET) {
      try {
        const gaResponse = await fetch(
          `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              client_id: req.headers['x-client-id'] || 'anonymous',
              events: [
                {
                  name: 'form_submit',
                  params: {
                    form_name: 'rhea_chatbot',
                    form_type: 'lead_capture',
                    business_focus: formData.business_focus || 'not_specified',
                    weekly_leads: formData.weekly_leads || 'not_specified',
                    ai_agent_type: formData.ai_agent || 'not_specified',
                    monthly_budget: formData.monthly_budget || 'not_specified',
                    source: 'rhea_chatbot',
                    engagement_time_msec: 1000,
                  },
                },
              ],
            }),
          }
        )

        if (!gaResponse.ok) {
          console.error('Google Analytics tracking failed:', await gaResponse.text())
        } else {
          console.log('Form submission tracked in Google Analytics')
        }
      } catch (gaError) {
        console.error('Error tracking in Google Analytics:', gaError)
        // Don't fail the entire request if GA fails
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error processing form submission:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    })
  }
}
