import { useEffect, useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { fetchAllCodesByPrefix, fetchUserCodesByPrefix } from "@/api/code";
import type { CodeResponse, User, Code } from "@/types";
import { useDelete } from "@/hooks/useDelete";
import { ScrollArea } from "../ui/scroll-area";

const useGetCodesByPrefix = (prefix: string) => {
  const [codes, setCodes] = useState<Code[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCodes = useCallback(
    async (userId: number) => {
      if (!prefix) return;
      try {
        setLoading(true);
        const response: CodeResponse = await fetchUserCodesByPrefix(userId, prefix);

        if (response && response.success) {
          setCodes(response.data ?? []);
        } else if (Array.isArray(response)) {
          setCodes(response);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Kodlar getirilemedi");
        setCodes([]);
      } finally {
        setLoading(false);
      }
    },
    [prefix]
  );

  const fetchAllCodes = useCallback(async () => {
    if (!prefix) return;
    try {
      setLoading(true);
      const response: CodeResponse = await fetchAllCodesByPrefix(prefix);

      if (response && response.success) {
        setCodes(response.data ?? []);
      } else if (Array.isArray(response)) {
        setCodes(response);
      } else {
        setCodes([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tüm kodlar getirilemedi");
      setCodes([]);
    } finally {
      setLoading(false);
    }
  }, [prefix]);

  const refetch = useCallback(
    (userId: number) => {
      if (userId && prefix) {
        fetchCodes(userId);
      }
    },
    [fetchCodes, prefix]
  );

  return { codes, loading, error, fetchCodes, fetchAllCodes, refetch };
};

type Props = {
  prefix: string;
};

export const CodeTable = ({ prefix }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showOnlyUserCodes, setShowOnlyUserCodes] = useState(true);
  const [showAllCodes, setShowAllCodes] = useState(false);

  const { codes, fetchCodes, fetchAllCodes, refetch, loading } = useGetCodesByPrefix(prefix);
  const [deletedCode, deleteCode] = useDelete();

  const pageTitle = `${prefix} Kodları`;

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser: User = JSON.parse(userData);
        setCurrentUser(parsedUser);
        if (parsedUser.id) {
          fetchCodes(parsedUser.id);
        }
      } catch (err) {
        console.error("Hata:", err);
      }
    }
  }, [fetchCodes]);

  useEffect(() => {
    if (codes.length > 0) {
      codes.forEach((code, index) => {
        console.log(`Code ${index}:`, {
          code: code.code,
          createdBy: code.createdBy,
          createdByType: typeof code.createdBy,
          userId: currentUser?.id,
        });
      });
    }
  }, [codes, currentUser]);

  useEffect(() => {
    const handleRefreshCodes = () => {
      if (currentUser?.id) {
        refetch(currentUser.id);
      }
    };

    window.addEventListener("refreshCodes", handleRefreshCodes);
    window.addEventListener("refreshCmmCodes", handleRefreshCodes);

    return () => {
      window.removeEventListener("refreshCodes", handleRefreshCodes);
      window.removeEventListener("refreshCmmCodes", handleRefreshCodes);
    };
  }, [currentUser, refetch]);

  useEffect(() => {
    if (deletedCode && currentUser) {
      refetch(currentUser.id);
    }
  }, [deletedCode, currentUser, refetch]);

  const columnHelper = createColumnHelper<Code>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("code", {
        header: `${prefix} Kodu`,
        cell: (info) => <span className="font-mono font-medium">{info.getValue()}</span>,
      }),

      columnHelper.accessor("createdAt", {
        header: "Oluşturma Tarihi",
        cell: (info) => {
          try {
            return new Date(info.getValue()).toLocaleDateString("tr-TR");
          } catch {
            return info.getValue();
          }
        },
      }),

      columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
          // Kuıllanıcı sadece kendi kodlarını silebilir
          const canDelete = currentUser && String(row.original.createdBy) === String(currentUser.id);

          if (!canDelete) {
            return null; // Silme butonu gösterme
          }

          return (
            <div className="flex gap-2">
              <Button
                onClick={() => deleteCode(row.original.code)}
                variant="outline"
                size="sm"
                className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
              >
                <Trash2 className="w-4 h-4" />
                Sil
              </Button>
            </div>
          );
        },
      }),
    ],
    [deleteCode, prefix, currentUser]
  );

  const filteredData = useMemo(() => {
    let filtered = codes;
    if (showOnlyUserCodes && currentUser) {
      filtered = filtered.filter((code) => {
        const codeCreatedByStr = String(code.createdBy);
        const userIdStr = String(currentUser.id);
        return codeCreatedByStr === userIdStr;
      });
    }
    return filtered;
  }, [codes, showOnlyUserCodes, currentUser]);

  const handleShowAllCodes = () => {
    const newShowAllCodes = !showAllCodes;
    setShowAllCodes(newShowAllCodes);

    if (newShowAllCodes) {
      setShowOnlyUserCodes(false);
      fetchAllCodes();
    } else if (currentUser?.id) {
      fetchCodes(currentUser.id);
    }
  };

  // const handleShowOnlyUserCodes = () => {
  //   const newShowOnlyUserCodes = !showOnlyUserCodes;
  //   setShowOnlyUserCodes(newShowOnlyUserCodes);

  //   if (newShowOnlyUserCodes && showAllCodes) {
  //     setShowAllCodes(false);
  //     if (currentUser?.id) {
  //       fetchCodes(currentUser.id);
  //     }
  //   } else if (!newShowOnlyUserCodes && currentUser?.id) {
  //     fetchCodes(currentUser.id);
  //   }
  // };

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    filterFns: [],
  });

  if (loading) {
    return (
      <div className="space-y-4 w-fit">
        <Card className="p-4">
          <div className="text-center py-8">
            <div className="animate-pulse">Kodlar yükleniyor...</div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 ">
      <Card className="p-4 ">
        <CardHeader className="text-black p-0 pb-4">
          <h3 className="text-lg font-semibold">{pageTitle}</h3>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <div>
            <Label htmlFor="search">Kod Ara</Label>
            <Input
              id="search"
              placeholder={`Aramak istediğiniz ${prefix} kodunu yazın.`}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="mt-5"
            />
          </div>

          <div className="flex items-center space-x-4 justify-between">
            <Button variant="outline" size="sm" onClick={handleShowAllCodes} className="bg-pink-100">
              {showAllCodes ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Sadece Kendi Kodlarım
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Tüm Kodları Göster
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="p-4 ">
        <div className="h-110 overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left p-3 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: " ↑",
                        desc: " ↓",
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      <ScrollArea>{flexRender(cell.column.columnDef.cell, cell.getContext())}</ScrollArea>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-8 text-gray-700">
              {globalFilter
                ? `"${globalFilter}" araması için ${prefix} kodu bulunamadı.`
                : showAllCodes
                  ? `Sistemde hiç ${prefix} kodu bulunmuyor.`
                  : showOnlyUserCodes
                    ? `Oluşturduğunuz ${prefix} kodu bulunmuyor.`
                    : `Hiç ${prefix} kodu bulunamadı.`}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
