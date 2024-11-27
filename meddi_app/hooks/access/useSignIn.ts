import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useSignIn = () => {
    return useMutation({
        mutationFn: async () => {
            // await axios.post()
        }
    })
}