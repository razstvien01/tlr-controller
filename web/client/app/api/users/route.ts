import { NextRequest, NextResponse } from 'next/server'
import { USER_QUERY } from '../../../types/constants'


export const GET = async (request: NextRequest, response: NextResponse) => {
  const url = new URL(request.url)
  const query = url.searchParams.get("query")
  
  
  return NextResponse.json({
    success: true,
    message: "Users Fetch Successfully"
  })
}