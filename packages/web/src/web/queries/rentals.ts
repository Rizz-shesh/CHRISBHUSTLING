import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useRentalSignup() {
  return useMutation(orpc.rentals.signup.mutationOptions());
}
