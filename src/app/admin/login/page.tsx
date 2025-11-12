"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAdmin } from "@/contexts/AdminContext";

const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAdmin();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError(null);
    const success = login(values.email, values.password);
    
    if (success) {
      router.push("/auditoria");
    } else {
      setError("Email ou senha incorretos");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex h-fit rounded-lg w-full shadow-md shadow-gray-300 max-w-md flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black">
        <div className="w-full space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-semibold leading-10 tracking-tight text-[#13679F] dark:text-zinc-50">
              Login Admin
            </h1>
            <p className="text-md leading-8 text-[#13679f] dark:text-zinc-400">
              Acesse o painel de auditoria
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">
                      Email*
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@admin.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-8 text-[#13679f] dark:text-zinc-400">
                      Senha*
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                <p className="font-semibold mb-1">Credenciais padrão:</p>
                <p>Email: admin@admin.com</p>
                <p>Senha: admin123</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#13679f] text-white hover:bg-[#13679f]/90 cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}

