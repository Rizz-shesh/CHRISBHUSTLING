import { useMutation, useQuery } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export type AdminCreds = { username: string; password: string };

export function useAdminLogin() {
  return useMutation(orpc.admin.login.mutationOptions());
}

export function usePushToGhl() {
  return useMutation(orpc.admin.pushToGhl.mutationOptions());
}

export function useDeleteServiceInquiry() {
  return useMutation(orpc.admin.deleteServiceInquiry.mutationOptions());
}

export function useDeleteRentalSignup() {
  return useMutation(orpc.admin.deleteRentalSignup.mutationOptions());
}

export function useSignups(creds: AdminCreds | null) {
  return useQuery(
    orpc.admin.listSignups.queryOptions({
      input: creds ?? { username: "", password: "" },
      enabled: !!creds,
      retry: false,
      staleTime: 10_000,
    }),
  );
}

export function useServiceInquiries(creds: AdminCreds | null) {
  return useQuery(
    orpc.admin.listServiceInquiries.queryOptions({
      input: creds ?? { username: "", password: "" },
      enabled: !!creds,
      retry: false,
      staleTime: 10_000,
    }),
  );
}
