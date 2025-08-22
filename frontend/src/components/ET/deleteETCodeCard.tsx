// import { useEffect, useState, useMemo, useCallback } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
//   createColumnHelper,
//   flexRender,
// } from "@tanstack/react-table";
// import { Button } from "../ui/button";
// import { Card, CardHeader, CardContent } from "../ui/card";
// import { Input } from "../ui/input";
// import { Label } from "@/components/ui/label";
// import { Trash2, Eye, EyeOff } from "lucide-react";
// import { useDelete } from "@/hooks/useDeleteCmm";
// import { ScrollArea } from "@/components/ui/scroll-area";

// const useGetETCodes = () => {
//   const [codes, setCodes] = useState<ETCode[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCodes = useCallback(async (userId: number) => {
//     try {
//       setLoading(true);

//       const response: CMMResponse = await fetchCmmCodes(userId);

//       if (response && response.success) {
//         const codesArray = response.codes || response.process || response.data || [];
//         setCodes(Array.isArray(codesArray) ? codesArray : []);
//       } else {
//         if (Array.isArray(response)) {
//           setCodes(response);
//         }
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(err instanceof Error ? err.message : "Kodlar getirilemedi");
//       setCodes([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const refetch = useCallback(
//     (userId: number) => {
//       if (userId) {
//         fetchCodes(userId);
//       }
//     },
//     [fetchCodes]
//   );

//   return { codes, loading, error, fetchCodes, refetch };
// };

// export const DeleteTable = () => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [showOnlyUserCodes, setShowOnlyUserCodes] = useState(false);

//   const { codes, fetchCodes, refetch } = useGetCmmCodes();
//   const [deletedCode, deleteCode] = useDelete();

//   useEffect(() => {
//     const userData = localStorage.getItem("user"); //burası düzeltilecek

//     if (userData) {
//       try {
//         const parsedUser: User = JSON.parse(userData);
//         setCurrentUser(parsedUser);
//         if (parsedUser.id) {
//           fetchCodes(parsedUser.id);
//         }
//       } catch (err) {
//         console.error("Hata:", err);
//       }
//     }
//   }, [fetchCodes]);

//   //  Kod kaydedildiğinde tabloyu yenile
//   useEffect(() => {
//     const handleRefreshCodes = () => {
//       if (currentUser?.id) {
//         refetch(currentUser.id);
//       }
//     };
//     window.addEventListener("refreshCmmCodes", handleRefreshCodes);
//     return () => {
//       window.removeEventListener("refreshCmmCodes", handleRefreshCodes);
//     };
//   }, [currentUser, refetch]);

//   // silme kısmından sonra sayfayı yenileme
//   useEffect(() => {
//     if (deletedCode && currentUser) {
//       refetch(currentUser.id);
//     }
//   }, [deletedCode, currentUser, refetch]);

//   const columnHelper = createColumnHelper<CmmCode>();

//   const columns = useMemo(
//     () => [
//       columnHelper.accessor("code", {
//         header: "CMM Kodu",
//         cell: (info) => <span className="font-mono font-medium">{info.getValue()}</span>,
//       }),

//       columnHelper.accessor("createdAt", {
//         header: "Oluşturma Tarihi",
//         cell: (info) => {
//           try {
//             return new Date(info.getValue()).toLocaleDateString("tr-TR");
//           } catch {
//             return info.getValue();
//           }
//         },
//       }),

//       columnHelper.display({
//         id: "actions",
//         cell: ({ row }) => {
//           return (
//             <div className="flex gap-2">
//               <Button
//                 onClick={() => deleteCode(row.original.code)}
//                 variant="outline"
//                 size="sm"
//                 className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Sil
//               </Button>
//             </div>
//           );
//         },
//       }),
//     ],
//     [deleteCode] //hata aldığım için yazdım
//   );

//   const filteredData = useMemo(() => {
//     let filtered = codes;
//     if (showOnlyUserCodes && currentUser) {
//       filtered = codes.filter((code) => code.createdBy === currentUser.id.toString());
//     }
//     return filtered;
//   }, [codes, showOnlyUserCodes, currentUser]);

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     state: {
//       globalFilter,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     globalFilterFn: "includesString",
//     filterFns: undefined,
//   });

//   return (
//     <div className="space-y-4">
//       <Card className="p-4">
//         <CardHeader className="text-black p-0 pb-4">
//           <h3 className="text-lg font-semibold">CMM Kodları Yönetimi</h3>
//         </CardHeader>
//         <CardContent className="p-0 space-y-4">
//           <div>
//             <Label htmlFor="search">Kod Ara</Label>
//             <Input
//               id="search"
//               placeholder="Aramak istediğiniz CMM kodunu yazın."
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               className="mt-1"
//             />
//           </div>

//           <div className="flex items-center space-x-4">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setShowOnlyUserCodes(!showOnlyUserCodes)}
//               className={showOnlyUserCodes ? "bg-blue-50 border-blue-200" : ""}
//             >
//               {showOnlyUserCodes ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
//               {/* iki buton */}
//               {showOnlyUserCodes ? "Tüm Kodlar" : "Sadece Benim Kodlarım"}
//             </Button>

//             {/* kod sayısı */}
//             <span className="text-sm text-gray-600">Toplam: {table.getFilteredRowModel().rows.length} kod</span>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="p-4">
//         <div className="h-100 overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id} className="border-b">
//                   {headerGroup.headers.map((header) => (
//                     <th
//                       key={header.id}
//                       className="text-left p-3 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
//                       onClick={header.column.getToggleSortingHandler()}
//                     >
//                       {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                       {{
//                         asc: " ↑",
//                         desc: " ↓",
//                       }[header.column.getIsSorted() as string] ?? null}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>

//             <tbody>
//               {table.getRowModel().rows.map((row) => (
//                 <tr key={row.id} className="border-b hover:bg-gray-50 transition-colors">
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id} className="p-3">
//                       <ScrollArea>{flexRender(cell.column.columnDef.cell, cell.getContext())}</ScrollArea>
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {table.getRowModel().rows.length === 0 && (
//             <div className="text-center py-8 text-gray-500">
//               {globalFilter
//                 ? `"${globalFilter}" araması için sonuç bulunamadı.`
//                 : showOnlyUserCodes
//                   ? "Henüz hiç CMM kodunuz bulunmuyor."
//                   : "Hiç CMM kodu bulunamadı."}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// };
