"use client";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { CheckIcon, XIcon } from "lucide-react";

const leadsIndication = [
    {
        _id: "1",
        name: "John Doe",
        telefone: "1234567890",
        XP: "2 a 3",
        setor: "Financeiro",
        tamEmpresa: "11 a 50",
        createdAt: "2021-01-01",
    },
    {
        _id: "2",
        name: "Jane Doe",
        telefone: "1234567890",
        XP: "2 a 3",
        setor: "Financeiro",
        tamEmpresa: "11 a 50",
        createdAt: "2021-01-01",
    },
    {
        _id: "3",
        name: "John Doe",
        telefone: "1234567890",
        XP: "2 a 3",
        setor: "Financeiro",
        tamEmpresa: "11 a 50",
        createdAt: "2021-01-01",
    },
    {
        _id: "4",
        name: "John Doe",
        telefone: "1234567890",
        XP: "2 a 3",
        setor: "Financeiro",
        tamEmpresa: "11 a 50",
        createdAt: "2021-01-01",
    },
    {
        _id: "5",
        name: "John Doe",
        telefone: "1234567890",
        XP: "2 a 3",
        setor: "Financeiro",
        tamEmpresa: "11 a 50",
        createdAt: "2021-01-01",
    },
    {
        _id: "6",
        name: "John Doe",
        telefone: "1234567890",
        XP: "2 a 3",
        setor: "Financeiro",
        tamEmpresa: "11 a 50",
        createdAt: "2021-01-01",
    },
];

export default function Usuarios() {

    return (
      <div className="relative w-[90%] mx-auto flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-[#13679F] py-4">Usuários	</h3>
        <div className="flex flex-col gap-2 items-center mt-8">
            <Table className="w-full text-[#13679F]">
                <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                  <TableRow>
                    <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Nome
                    </TableCell>
                    <TableCell
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 hidden md:table-cell"
                    >
                      Telefone
                    </TableCell>
                    <TableCell
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 hidden md:table-cell"
                    >
                    XP
                    </TableCell>
                    <TableCell
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 hidden md:table-cell"
                    >
                      Setor
                    </TableCell>
                    <TableCell
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 hidden md:table-cell"
                    >
                      Tam. da empresa
                    </TableCell>
                    <TableCell  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {leadsIndication.map((lead: any) => (
                    <TableRow key={lead._id}>

                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                            {lead.name}
                        </div>
                      </TableCell>

                      <TableCell
                        className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                            {lead.telefone}
                      </TableCell>

                      <TableCell
                        className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                        {lead.XP}
                      </TableCell>

                      <TableCell
                        className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                        {lead.setor}
                      </TableCell>

                      <TableCell
                        className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                        {lead.tamEmpresa}
                      </TableCell>

                      <TableCell className="flex py-3 text-gray-500 text-theme-sm gap-8 dark:text-gray-400 whitespace-nowrap">
                          <CheckIcon className="text-[#13679F] size-8 cursor-pointer hover:text-white hover:bg-[#13679F] rounded-full p-2 transition-all duration-300"/>
                          <XIcon className="text-[#13679F] size-8 cursor-pointer hover:text-white hover:bg-[#13679F] rounded-full p-2 transition-all duration-300" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </div>
      </div>
    )
}