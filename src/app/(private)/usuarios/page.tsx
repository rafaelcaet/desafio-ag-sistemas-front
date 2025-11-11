import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

const leadsIndication = [
    {
        _id: "1",
        name: "John Doe",
        phone: "1234567890",
        createdAt: "2021-01-01",
    },
    {
        _id: "2",
        name: "John Smith",
        phone: "1234567890",
        createdAt: "2021-01-01",
    },
    {
        _id: "3",
        name: "John Pires",
        phone: "1234567890",
        createdAt: "2021-01-01",
    },
    {
        _id: "4",
        name: "John Silva",
        phone: "1234567890",
        createdAt: "2021-01-01",
    },
]

export default function Usuarios() {
    return (
        <div className="relative w-[90%] mx-auto">
            <h3 className="text-2xl font-bold text-[#13679F] py-4">Usuários</h3>
              <Table className="w-full rounded-lg mt-8 text-[#13679F]">
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
                      Data de cadastro
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
                            {lead.phone}
                      </TableCell>

                      <TableCell
                        className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                        {lead.createdAt}
                      </TableCell>

                      <TableCell className="flex py-3 text-gray-500 text-theme-sm gap-4 dark:text-gray-400 whitespace-nowrap">
                        <Button
                          className="text-gray-500 border-gray-300 dark:border-gray-700"
                        >
                          Ver Dados
                        </Button>
                          <Button
                            variant="outline"
                            className="text-gray-500 border-gray-300 dark:border-gray-700"
                          >
                            Editar
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
    )
}