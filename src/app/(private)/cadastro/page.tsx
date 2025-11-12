"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  telefone: z.string().min(10, "Telefone inválido").regex(/^[\d\s\(\)\-\+]+$/, "Telefone inválido"),
  cargo: z.string().min(2, "Cargo deve ter pelo menos 2 caracteres"),
  departamento: z.string().min(2, "Departamento deve ter pelo menos 2 caracteres"),
  experiencia: z.string().min(1, "Selecione sua experiência"),
  setor: z.string().min(1, "Selecione o setor da empresa"),
  tamanhoEmpresa: z.string().min(1, "Selecione o tamanho da empresa"),
  linkedin: z.union([z.string().url("URL inválida"), z.literal("")]),
  areasInteresse: z.string().min(10, "Descreva suas áreas de interesse (mínimo 10 caracteres)"),
  disponibilidade: z.string().min(1, "Selecione sua disponibilidade"),
  preferenciaContato: z.string().min(1, "Selecione sua preferência de contato"),
  observacoes: z.string().optional(),
});

export default function Cadastro() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, authenticate } = useAuth();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      const success = authenticate(token);
      setIsValid(success);
      setIsValidating(false);
      if (!success) {
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } else {
      if (isAuthenticated) {
        setIsValid(true);
        setIsValidating(false);
      } else {
        setIsValid(false);
        setIsValidating(false);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    }
  }, [searchParams, authenticate, isAuthenticated, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      telefone: "",
      cargo: "",
      departamento: "",
      experiencia: "",
      setor: "",
      tamanhoEmpresa: "",
      linkedin: "",
      areasInteresse: "",
      disponibilidade: "",
      preferenciaContato: "",
      observacoes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Dados do cadastro:', values);
    alert('Cadastro completo! Os dados foram salvos.');
    // Aqui você pode salvar os dados completos do cadastro
    form.reset();
  };

  if (isValidating) {
    return (
      <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
        <main className="flex h-fit rounded-lg w-full max-w-2xl flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#13679F] mx-auto mb-4"></div>
            <p className="text-[#13679f] dark:text-zinc-400">Validando acesso...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
        <main className="flex h-fit rounded-lg w-full max-w-2xl flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black">
          <div className="w-full max-w-md space-y-8 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl font-semibold leading-10 tracking-tight text-[#13679F] dark:text-zinc-50">
                Link inválido ou expirado
              </h1>
              <p className="text-md leading-8 text-[#13679f] dark:text-zinc-400">
                O link de acesso é inválido ou já foi utilizado. Você será redirecionado para o formulário.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex h-fit rounded-lg w-full max-w-2xl flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-semibold leading-10 tracking-tight text-[#13679F] dark:text-zinc-50">
            Cadastro de usuário
            </h1>
            <p className="text-md leading-8 text-[#13679f] dark:text-zinc-400">
              Complete seu perfil com informações mais detalhadas
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">Telefone*</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(00) 00000-0000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cargo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">Cargo*</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu cargo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="departamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">Departamento*</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu departamento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="experiencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">Anos de Experiência*</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="">Selecione...</option>
                        <option value="0-1">0 a 1 ano</option>
                        <option value="2-3">2 a 3 anos</option>
                        <option value="4-5">4 a 5 anos</option>
                        <option value="6-10">6 a 10 anos</option>
                        <option value="11+">Mais de 10 anos</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="setor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">Setor da Empresa*</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="">Selecione...</option>
                        <option value="tecnologia">Tecnologia</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="saude">Saúde</option>
                        <option value="educacao">Educação</option>
                        <option value="varejo">Varejo</option>
                        <option value="industria">Indústria</option>
                        <option value="servicos">Serviços</option>
                        <option value="consultoria">Consultoria</option>
                        <option value="outro">Outro</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tamanhoEmpresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">Tamanho da Empresa*</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="">Selecione...</option>
                        <option value="1-10">1 a 10 funcionários</option>
                        <option value="11-50">11 a 50 funcionários</option>
                        <option value="51-200">51 a 200 funcionários</option>
                        <option value="201-500">201 a 500 funcionários</option>
                        <option value="501+">Mais de 500 funcionários</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">LinkedIn (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/in/seu-perfil"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="areasInteresse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">Áreas de Interesse*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva as áreas que mais te interessam na plataforma..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="disponibilidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">Disponibilidade para Contato*</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="">Selecione...</option>
                        <option value="manha">Manhã (8h - 12h)</option>
                        <option value="tarde">Tarde (13h - 17h)</option>
                        <option value="noite">Noite (18h - 20h)</option>
                        <option value="qualquer">Qualquer horário</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferenciaContato"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">Preferência de Contato*</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="">Selecione...</option>
                        <option value="email">Email</option>
                        <option value="telefone">Telefone</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="linkedin">LinkedIn</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">Observações Adicionais (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Alguma informação adicional que gostaria de compartilhar..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#13679f] text-white hover:bg-[#13679f]/90 cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enviando..." : "Completar Cadastro"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
