import { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../../utils/database'

interface ErrorResponseType {
  error: string
}

interface SuccessResponseType {}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'GET') {
    const { email } = req.query

    if (!email) {
      res.status(400).json({ error: 'Missing e-mail on request' })
      return
    }

    const { db } = await connect()

    const response = await db.collection('users').findOne({ email })

    if (!response) {
      res.status(400).json({ error: 'User not found' })
      return
    }

    res.status(200).json(response)
  } else {
    res.status(400).json({ error: 'User not foundWrong requested method' })
  }
}
