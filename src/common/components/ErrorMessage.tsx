import { Alert } from '@mui/material'
import React from 'react'

interface errorMessageProps {
    errorMessage:string
}

const ErrorMessage = ({errorMessage}:errorMessageProps) => {
  return (
    <Alert severity="error">{errorMessage}</Alert>
  )
}

export default ErrorMessage
