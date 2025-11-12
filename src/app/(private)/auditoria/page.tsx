"use client";


import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckIcon, EyeIcon, XIcon } from "lucide-react";

const newUsers = [
    {
        _id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        company: "company 1",
        reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2021-01-01",
    },
    {
        _id: "2",
        name: "John Smith",
        email: "john.smith@example.com",
        company: "company 2",
        reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2021-01-01",
    },
    {
        _id: "3",
        name: "John Pires",
        email: "john.pires@example.com",
        company: "company 3",
        reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2021-01-01",
    },
    {
        _id: "4",
        name: "John Silva",
        email: "john.silva@example.com",
        company: "company 4",
        reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2021-01-01",
    },
    {
        _id: "5",
        name: "John Silva",
        email: "john.silva@example.com",
        company: "company 5",
        reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2021-01-01",
    },
    {
        _id: "6",
        name: "John Silva",
        email: "john.silva@example.com",
        company: "company 6",
        reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2021-01-01",
    },
    {
        _id: "7",
        name: "John Silva",
        email: "john.silva@example.com",
        company: "company 7",
        reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2021-01-01",
    },
    {
        _id: "8",
        name: "John Silva",
        email: "john.silva@example.com",
        company: "company 8",
        reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "2021-01-01",
    }
];

export default function Auditoria() {

    return (
      <div className="relative w-[90%] mx-auto flex flex-col gap-3">
        <h3 className="text-3xl font-bold text-[#13679F] py-3">Auditoria</h3>
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
                  {newUsers.map((user: any) => (
                    <TableRow key={user._id} className="hover:bg-[#13679F]/15">
                      <TableCell className="py-2">
                            {user.name}
                      </TableCell>

                      <TableCell
                        className="py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                            {user.email}
                      </TableCell>

                      <TableCell
                        className="py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                            {user.company}
                      </TableCell>

                      <TableCell className="py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block max-w-[220px] truncate cursor-help">
                              {user.reason}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs text-left whitespace-pre-wrap">
                            {user.reason}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>

                      <TableCell
                        className="py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                        {user.createdAt}
                      </TableCell>

                      <TableCell className="flex py-2 text-gray-500 gap-4 dark:text-gray-400 whitespace-nowrap">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex">
                              <CheckIcon className="text-[#13679F] size-7 cursor-pointer hover:text-white hover:bg-[#13679F] rounded-full p-1.5 transition-all duration-300" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>Aprovar</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex">
                              <XIcon className="text-[#13679F] size-7 cursor-pointer hover:text-white hover:bg-[#13679F] rounded-full p-1.5 transition-all duração-300" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>Reprovar</TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </div>
      </div>
    )
}