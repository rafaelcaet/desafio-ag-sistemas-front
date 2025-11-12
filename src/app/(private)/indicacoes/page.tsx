"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type IndicationStatus = "Nova" | "Em contato" | "Fechada" | "Recusada";

type Member = {
  id: string;
  name: string;
};

type Indication = {
  id: string;
  fromMemberId: string;
  toMemberId: string;
  company: string;
  description: string;
  status: IndicationStatus;
  createdAt: string;
  updatedAt: string;
};

const MEMBERS: Member[] = [
  { id: "john.doe@example.com", name: "John Doe" },
  { id: "jane.silva@example.com", name: "Jane Silva" },
  { id: "ana.pires@example.com", name: "Ana Pires" },
  { id: "maria.oliveira@example.com", name: "Maria Oliveira" },
  { id: "carlos.souza@example.com", name: "Carlos Souza" },
];

const CURRENT_MEMBER_ID = MEMBERS[0].id;
const INDICATIONS_STORAGE_KEY = "memberIndications";

const STATUS_OPTIONS: IndicationStatus[] = ["Nova", "Em contato", "Fechada", "Recusada"];

const formSchema = z.object({
  toMemberId: z.string().min(1, "obrigatório"),
  company: z.string().min(1, "obrigatório"),
  description: z.string().min(1, "obrigatório"),
});

declare global {
  interface WindowEventMap {
    indicationsUpdated: Event;
  }
}

export default function Indicacoes() {
  const [indications, setIndications] = useState<Indication[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toMemberId: "",
      company: "",
      description: "",
    },
  });

  const currentMember = useMemo(
    () => MEMBERS.find((member) => member.id === CURRENT_MEMBER_ID),
    []
  );

  const availableMembers = useMemo(
    () => MEMBERS.filter((member) => member.id !== CURRENT_MEMBER_ID),
    []
  );

  const sentIndications = useMemo(
    () => indications.filter((indication) => indication.fromMemberId === CURRENT_MEMBER_ID),
    [indications]
  );

  const receivedIndications = useMemo(
    () => indications.filter((indication) => indication.toMemberId === CURRENT_MEMBER_ID),
    [indications]
  );

  useEffect(() => {
    const loadIndications = () => {
      if (typeof window === "undefined") {
        return;
      }

      try {
        const stored = window.localStorage.getItem(INDICATIONS_STORAGE_KEY);
        const parsed: Indication[] = stored ? JSON.parse(stored) : [];
        setIndications(parsed);
      } catch (error) {
        console.error("Não foi possível carregar as indicações", error);
        setIndications([]);
      }
    };

    loadIndications();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === INDICATIONS_STORAGE_KEY) {
        loadIndications();
      }
    };

    const handleIndicationsUpdated = () => {
      loadIndications();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("indicationsUpdated", handleIndicationsUpdated);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("indicationsUpdated", handleIndicationsUpdated);
    };
  }, []);

  const persistIndications = (nextIndications: Indication[]) => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(INDICATIONS_STORAGE_KEY, JSON.stringify(nextIndications));
    window.dispatchEvent(new Event("indicationsUpdated"));
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newIndication: Indication = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
      fromMemberId: CURRENT_MEMBER_ID,
      toMemberId: values.toMemberId,
      company: values.company,
      description: values.description,
      status: "Nova",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const next = [newIndication, ...indications];
    setIndications(next);
    persistIndications(next);
    form.reset();
  };

  const handleStatusChange = (id: string, status: IndicationStatus) => {
    const next = indications.map((indication) =>
      indication.id === id
        ? { ...indication, status, updatedAt: new Date().toISOString() }
        : indication
    );
    setIndications(next);
    persistIndications(next);
  };

  const getMemberName = (memberId: string) =>
    MEMBERS.find((member) => member.id === memberId)?.name ?? "Membro desconhecido";

  return (
    <div className="relative w-[90%] mx-auto flex flex-col gap-6">
      <header className="flex flex-col gap-1 py-3">
        <h1 className="text-3xl font-bold text-[#13679F]">Sistema de Indicações</h1>
      </header>

      <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black">
        <h2 className="text-xl font-semibold text-[#13679F] mb-4">Criar nova indicação</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="toMemberId"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className="text-sm font-medium text-[#13679F]">Membro indicado*</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-[#13679F] focus:outline-none focus:ring-2 focus:ring-[#13679F]/20 dark:border-gray-700 dark:bg-black dark:text-gray-200"
                    >
                      <option value="">Selecione um membro</option>
                      {availableMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className="text-sm font-medium text-[#13679F]">Empresa/Contato indicado*</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da empresa ou contato" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-sm font-medium text-[#13679F]">Descrição da oportunidade*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Compartilhe detalhes sobre a oportunidade"
                      className="min-h-[60px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex justify-end">
              <Button
                type="submit"
                className="bg-[#13679F] text-white hover:bg-[#13679F]/90"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enviando..." : "Registrar indicação"}
              </Button>
            </div>
          </form>
        </Form>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black">
          <h2 className="text-lg font-semibold text-[#13679F] mb-4">Indicações enviadas</h2>
          <div className="w-full h-[280px] overflow-y-auto rounded-lg border border-gray-100 dark:border-gray-800">
            <Table className="w-full text-[#13679F]">
              <TableHeader className="sticky top-0 z-10 bg-white dark:bg-black border-gray-100 dark:border-gray-800 border-y">
                <TableRow>
                  <TableCell className="py-2 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                    Para
                  </TableCell>
                  <TableCell className="py-2 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                    Empresa/Contato
                  </TableCell>
                  <TableCell className="py-2 font-medium text-gray-500 text-start text-xs dark:text-gray-400 hidden xl:table-cell">
                    Descrição
                  </TableCell>
                  <TableCell className="py-2 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                    Status
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {sentIndications.length > 0 ? (
                  sentIndications.map((indication) => (
                    <TableRow key={indication.id} className="hover:bg-[#13679F]/15">
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">
                        {getMemberName(indication.toMemberId)}
                      </TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">
                        {indication.company}
                      </TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300 hidden xl:table-cell">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block max-w-[200px] truncate cursor-help">
                              {indication.description}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs text-left whitespace-pre-wrap">
                            {indication.description}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">
                        <select
                          value={indication.status}
                          onChange={(event) =>
                            handleStatusChange(indication.id, event.target.value as IndicationStatus)
                          }
                          className="w-full rounded-md border border-gray-200 px-2 py-1 text-xs focus:border-[#13679F] focus:outline-none focus:ring-2 focus:ring-[#13679F]/20 dark:border-gray-700 dark:bg-black dark:text-gray-200"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-6 text-center text-gray-500 dark:text-gray-400">
                      Você ainda não enviou nenhuma indicação.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black">
          <h2 className="text-lg font-semibold text-[#13679F] mb-4">Indicações recebidas</h2>
          <div className="w-full h-[280px] overflow-y-auto rounded-lg border border-gray-100 dark:border-gray-800">
            <Table className="w-full text-[#13679F]">
              <TableHeader className="sticky top-0 z-10 bg-white dark:bg-black border-gray-100 dark:border-gray-800 border-y">
                <TableRow>
                  <TableCell className="py-2 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                    De
                  </TableCell>
                  <TableCell className="py-2 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                    Empresa/Contato
                  </TableCell>
                  <TableCell className="py-2 font-medium text-gray-500 text-start text-xs dark:text-gray-400 hidden xl:table-cell">
                    Descrição
                  </TableCell>
                  <TableCell className="py-2 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                    Status
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {receivedIndications.length > 0 ? (
                  receivedIndications.map((indication) => (
                    <TableRow key={indication.id} className="hover:bg-[#13679F]/15">
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">
                        {getMemberName(indication.fromMemberId)}
                      </TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">
                        {indication.company}
                      </TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300 hidden xl:table-cell">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block max-w-[200px] truncate cursor-help">
                              {indication.description}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs text-left whitespace-pre-wrap">
                            {indication.description}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">
                        <select
                          value={indication.status}
                          onChange={(event) =>
                            handleStatusChange(indication.id, event.target.value as IndicationStatus)
                          }
                          className="w-full rounded-md border border-gray-200 px-2 py-1 text-xs focus:border-[#13679F] focus:outline-none focus:ring-2 focus:ring-[#13679F]/20 dark:border-gray-700 dark:bg-black dark:text-gray-200"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-6 text-center text-gray-500 dark:text-gray-400">
                      Nenhuma indicação recebida até o momento.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}

