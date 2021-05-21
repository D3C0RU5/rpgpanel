import connect from '../../../../utils/database'
import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectID } from 'bson'

interface ErrorResponseType {
  error: string
}

interface SuccessResponseType {
  name: string
  email: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponseType | ErrorResponseType>
) => {
  if (req.method === 'POST') {
    const {
      name,
      email,
      apelido,
      image,
      _id
    }: {
      name: string
      email: string
      apelido: string
      image: string
      _id: string
    } = req.body

    if (!email) {
      res.status(400).json({ error: 'Missing body parameter' })
      return
    }

    const { db } = await connect()

    const emailAlreadyExists = await db
      .collection('users')
      .findOne({ email: email })

    if (emailAlreadyExists) {
      res.status(400).json({ error: `E-mail ${email} already exists` })
      return
    }

    const response = await db.collection('users').insertOne({
      name,
      email,
      apelido,
      image,
      _id: new ObjectID(_id)
    })

    res.status(200).json(response.ops[0])
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
