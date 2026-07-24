import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useServiceInquiry() {
  return useMutation(orpc.services.inquire.mutationOptions());
}
