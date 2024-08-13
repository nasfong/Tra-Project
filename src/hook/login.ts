import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type LoginMutation = {
  username: string,
  password: string,
}

export const useMutationLogin = () => {
  return useMutation({
    mutationFn: async (formData: LoginMutation) => axios.post('/login', formData)
  })
}