import Airtable from 'airtable'

export default new Airtable({ apiKey: process.env.AIRTABLE_API_USER_KEY }).base(
  process.env.AIRTABLE_DATABASE_ID
)
