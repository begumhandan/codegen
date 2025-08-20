import { useEffect, useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import { useHandleDeleteFromDB } from "../hooks/useCmm/useHandleDeleteFromDb";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { fetchCmmCodes } from "@/api/cmm";
import type { CMMResponse, User, CmmCode } from "@/types";

const useGetCmmCodes = () => {
  const [codes, setCodes] = useState<CmmCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCodes = useCallback(async (userId: number) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching codes for user ID:", userId);
      console.log("API URL will be:", `http://localhost:3000/cmm/${userId}`);

      const response: CMMResponse = await fetchCmmCodes(userId);

      console.log("Full API Response:", response);
      console.log("Response type:", typeof response);
      console.log("Response keys:", Object.keys(response));

      if (response && response.success) {
        const codesArray = response.codes || response.process || response.data || [];

        setCodes(Array.isArray(codesArray) ? codesArray : []);
      } else {
        if (Array.isArray(response)) {
          setCodes(response);
        } else {
          throw new Error(response?.message || "Kodlar getirilemedi");
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Kodlar getirilemedi");
      setCodes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(
    (userId: number) => {
      if (userId) {
        fetchCodes(userId);
      }
    },
    [fetchCodes]
  );

  return { codes, loading, error, fetchCodes, refetch };
};

export const CmmCodesManagement = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showOnlyUserCodes, setShowOnlyUserCodes] = useState(false);

  const { codes, loading, error, fetchCodes, refetch } = useGetCmmCodes();
  const { handleDeleteFromDB } = useHandleDeleteFromDB();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("Raw user data from localStorage:", userData);

    if (userData) {
      try {
        const parsedUser: User = JSON.parse(userData);
        console.log("Parsed user:", parsedUser);
        console.log("User ID:", parsedUser.id, "Type:", typeof parsedUser.id);

        setCurrentUser(parsedUser);

        if (parsedUser.id) {
          console.log("About to fetch codes for user ID:", parsedUser.id);
          fetchCodes(parsedUser.id);
        } else {
          console.log("No user ID found");
        }
      } catch (err) {
        console.error("Failed to parse user data:", err);
        setCurrentUser(null);
      }
    } else {
      console.log("No user data in localStorage");
    }
  }, [fetchCodes]);

  const columnHelper = createColumnHelper<CmmCode>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("code", {
        header: "CMM Kodu",
        cell: (info) => <span className="font-mono font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("createdBy", {
        header: "Oluşturan",
        cell: (info) => (
          <span className={info.getValue() === currentUser?.id.toString() ? "text-blue-600 font-medium" : ""}>
            {info.getValue() === currentUser?.id.toString() ? "Siz" : info.getValue()}
          </span>
        ),
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
        header: "İşlemler",
        cell: ({ row }) => {
          const isUserCode = row.original.createdBy === currentUser?.id.toString();
          const isActive = row.original.status === "active";

          return (
            <div className="flex gap-2">
              {isUserCode && isActive && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                  onClick={() => handleDelete(row.original.code)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              {!isUserCode && (
                <span className="text-xs text-gray-500 px-2 py-1">Sadece kendi kodlarınızı silebilirsiniz</span>
              )}
            </div>
          );
        },
      }),
    ],
    [currentUser]
  );

  const filteredData = useMemo(() => {
    if (!codes || codes.length === 0) return [];

    let filtered = codes;

    if (showOnlyUserCodes && currentUser) {
      filtered = codes.filter((code) => code.createdBy === currentUser.id.toString());
    }

    return filtered;
  }, [codes, showOnlyUserCodes, currentUser]);

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
    filterFns: undefined,
  });

  const handleDelete = async (code: string) => {
    if (!currentUser) {
      alert("Giriş yapmanız gerekiyor!");
      return;
    }

    if (window.confirm(`${code} kodunu silmek istediğiniz emin misiniz?`)) {
      try {
        await handleDeleteFromDB(code, currentUser, () => {});
        refetch(currentUser.id);
      } catch (error) {
        console.error("Silme işlemi başarısız:", error);
        alert("Kod silinirken bir hata oluştu!");
      }
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    if (currentUser) {
      refetch(currentUser.id);
    }
  };

  const handleToggleFilter = () => {
    if (currentUser) {
      const newShowOnly = !showOnlyUserCodes;
      setShowOnlyUserCodes(newShowOnly);
      refetch(currentUser.id);
    }
  };

  if (loading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Kodlar yükleniyor...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <Button onClick={handleRefresh} className="mt-2">
            Tekrar Dene
          </Button>
        </div>
      </Card>
    );
  }

  if (!currentUser) {
    return (
      <Card className="p-4">
        <div className="text-center text-yellow-600">
          <p>Giriş yapmanız gerekiyor.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <CardHeader className="text-black p-0 pb-4">
          <h3 className="text-lg font-semibold">CMM Kodları Yönetimi</h3>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          {/* Search */}
          <div>
            <Label htmlFor="search">Kod Ara</Label>
            <Input
              id="search"
              placeholder="CMM kodu ara..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOnlyUserCodes(!showOnlyUserCodes)}
              className={showOnlyUserCodes ? "bg-blue-50 border-blue-200" : ""}
            >
              {showOnlyUserCodes ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
              {showOnlyUserCodes ? "Tüm Kodlar" : "Sadece Benim Kodlarım"}
            </Button>

            <span className="text-sm text-gray-600">Toplam: {table.getFilteredRowModel().rows.length} kod</span>
          </div>
        </CardContent>
      </Card>

      <Card className="p-4">
        <div className="overflow-x-auto">
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {globalFilter
                ? `"${globalFilter}" araması için sonuç bulunamadı.`
                : showOnlyUserCodes
                  ? "Henüz hiç CMM kodunuz bulunmuyor."
                  : "Hiç CMM kodu bulunamadı."}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
