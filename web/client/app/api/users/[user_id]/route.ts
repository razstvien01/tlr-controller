import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest, context: any) => {
  const { params } = context
  const { user_id } = params
  
  return NextResponse.json({
    succes: true,
    message: "User Fetch Successfully",
    user_id
  })
}

export const POST = async (request: NextRequest) => {
  
  return NextResponse.json({
    succes: true,
  })
}

export const PATCH = async (request: NextRequest) => {
  
  return NextResponse.json({
    succes: true,
  })
}

export const PUT = async (request: NextRequest) => {
  
  return NextResponse.json({
    succes: true,
  })
}

export const DELETE = async (request: NextRequest) => {
  
  return NextResponse.json({
    succes: true,
  })
}
