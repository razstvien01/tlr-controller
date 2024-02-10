import { NextRequest, NextResponse } from 'next/server'
import { USER_QUERY } from '../../../types/constants'
import { getUsers } from '../../../controllers/users.controller'


export const GET = async (request: NextRequest, response: NextResponse) => {
  const url = new URL(request.url)
  const query = url.searchParams.get("query")
  
  return getUsers()
}