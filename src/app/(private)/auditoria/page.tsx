"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon, LogOut } from "lucide-react";
import { getFormSubmissions, approveSubmission, rejectSubmission, FormSubmission } from "@/lib/auth";
import { useAdmin } from "@/contexts/AdminContext";

export default function Auditoria() {
    const router = useRouter();
    const { isAdmin, logout, adminEmail } = useAdmin();
    const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!isAdmin) {
            router.push('/admin/login');
        } else {
            setIsChecking(false);
            loadSubmissions();
        }
    }, [isAdmin, router]);

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    const loadSubmissions = () => {
        const allSubmissions = getFormSubmissions();
        // Mostra apenas pendentes
        const pendingSubmissions = allSubmissions.filter(s => s.status === 'pending');
        setSubmissions(pendingSubmissions);
    };

    const handleApprove = (submissionId: string) => {
        const token = approveSubmission(submissionId);
        if (token) {
            loadSubmissions();
            alert('Usuário aprovado! O link foi gerado e está no console.log');
        }
    };

    const handleReject = (submissionId: string) => {
        if (confirm('Tem certeza que deseja rejeitar esta solicitação?')) {
            rejectSubmission(submissionId);
            loadSubmissions();
        }
    };

    if (isChecking) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#13679F] mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Verificando autenticação...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    return (
      <div className="relative w-[90%] mx-auto flex flex-col gap-3">
        <div className="flex justify-between items-center py-3">
          <h3 className="text-3xl font-bold text-[#13679F]">Auditoria</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {adminEmail}
            </span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 text-[#13679F] border-[#13679F] hover:bg-[#13679F] hover:text-white"
            >
              <LogOut className="size-4" />
              Sair
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center">
            <Table className="w-full text-[#13679F]">
                <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                  <TableRow>
                    <TableCell className="py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Nome
                    </TableCell>
                    <TableCell                     
                      className="py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 hidden md:table-cell"
                    >
                      Email
                    </TableCell>
                    <TableCell                     
                      className="py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 hidden md:table-cell"
                    >
                      Empresa
                    </TableCell>
                    <TableCell
                      className="py-2 max-w-[120px] font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 hidden md:table-cell"
                    >
                      Motivo
                    </TableCell>
                    <TableCell
                      className="py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 hidden md:table-cell"
                    >
                      Data de criação
                    </TableCell>
                    <TableCell  className="py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800 text-theme-sm">
                  {submissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-gray-500 dark:text-gray-400">
                        Nenhuma solicitação pendente
                      </TableCell>
                    </TableRow>
                  ) : (
                    submissions.map((submission) => (
                      <TableRow key={submission._id} className="hover:bg-[#13679F]/15">
                        <TableCell className="py-2">
                          {submission.name}
                        </TableCell>

                        <TableCell
                          className="py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                          {submission.email}
                        </TableCell>

                        <TableCell
                          className="py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                          {submission.company}
                        </TableCell>

                        <TableCell className="py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="block max-w-[220px] truncate cursor-help">
                                {submission.reason}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs text-left whitespace-pre-wrap">
                              {submission.reason}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>

                        <TableCell
                          className="py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                          {new Date(submission.createdAt).toLocaleDateString('pt-BR')}
                        </TableCell>

                        <TableCell className="flex py-2 text-gray-500 gap-4 dark:text-gray-400 whitespace-nowrap">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-flex">
                                <CheckIcon 
                                  className="text-[#13679F] size-7 cursor-pointer hover:text-white hover:bg-[#13679F] rounded-full p-1.5 transition-all duration-300"
                                  onClick={() => handleApprove(submission._id)}
                                />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>Aprovar</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-flex">
                                <XIcon 
                                  className="text-[#13679F] size-7 cursor-pointer hover:text-white hover:bg-[#13679F] rounded-full p-1.5 transition-all duration-300"
                                  onClick={() => handleReject(submission._id)}
                                />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>Reprovar</TooltipContent>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
            </Table>
        </div>
      </div>
    )
}