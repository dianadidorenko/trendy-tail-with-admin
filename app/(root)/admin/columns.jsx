import { Button } from "@/components/ui/button";
import { ArrowUpDown, Delete, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns = (handleDelete, isSmallScreen, isMiddleScreen) => {
  const allColumns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Назва
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "categoryShow",
      header: ({ column }) =>
        !isSmallScreen ? (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Категорія
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ) : null,
      cell: ({ row }) =>
        !isSmallScreen ? (
          <div className="items-center justify-center">
            {row.original.categoryShow}
          </div>
        ) : null,
    },
    {
      accessorKey: "brand",
      header: ({ column }) =>
        !isSmallScreen ? (
          <div className="items-center justify-center">
            <Button
              variant="link"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Бренд
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : null,
      cell: ({ row }) =>
        !isSmallScreen ? (
          <div className="items-center justify-center">
            {row.original.brand}
          </div>
        ) : null,
    },
    {
      accessorKey: "image",
      header: () =>
        !isMiddleScreen ? (
          <div className="flex items-center justify-center">Фото</div>
        ) : null,
      cell: ({ row }) =>
        !isMiddleScreen ? (
          <div className="flex items-center justify-center">
            <Image
              src={row.original.images[0]}
              alt={row.original.name}
              width={60}
              height={60}
              objectFit="cover"
              style={{ borderRadius: "8px" }}
            />
          </div>
        ) : null,
    },
    {
      accessorKey: "sizes",
      header: () =>
        !isMiddleScreen ? (
          <div className="flex items-center justify-center">Розміри</div>
        ) : null,
      cell: ({ row }) =>
        !isMiddleScreen ? (
          <div className="flex items-center justify-center flex-col gap-1">
            {row.original.sizes.map((sizeObj, index) => (
              <span key={index} className="mr-1">
                {sizeObj.size}
                {index < row.original.sizes.length - 1 && ", "}
              </span>
            ))}
          </div>
        ) : null,
    },
    {
      id: "go",
      header: (
        <div className="flex items-center justify-center">
          <LinkIcon size={18} />
        </div>
      ),
      cell: ({ row }) => (
        <Link href={`/admin/${row.original._id}`} passHref>
          <Button
            variant="goTo"
            className="text-[10px] xsSm:text-[12px] px-1 xsSm:px-1.5 sm:text-[14px]"
          >
            Переглянути
          </Button>
        </Link>
      ),
    },
    {
      id: "delete",
      header: (
        <div className="flex items-center justify-center">
          <Delete size={18} />
        </div>
      ),
      cell: ({ row }) => (
        <Button
          variant="destructive"
          onClick={() => handleDelete(row.original._id)}
          className="text-[10px] xsSm:text-[12px] px-1 xsSm:px-1.5 sm:text-[14px]"
        >
          Видалити
        </Button>
      ),
    },
  ];

  return allColumns.filter((column) => {
    if (isSmallScreen) {
      return !["categoryShow", "brand", "image", "sizes"].includes(
        column.accessorKey
      );
    }
    if (isMiddleScreen) {
      return !["sizes", "image"].includes(column.accessorKey);
    }
    return true;
  });
};
