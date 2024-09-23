import ItemsTable from "./ItemsTable";
import Link from "next/link";

const AdminPanel = () => {
  return (
    <div className="form-container mx-auto p-4 my-6 max-w-[1000px] text-black dark:text-white bg-white dark:bg-slate-700 flex flex-col gap-6">
      <div className="flex items-center justify-center">
        <Link
          href={"/admin/add-item"}
          className="bg-green-700 dark:bg-rose-900 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Додати товар
        </Link>
      </div>

      <ItemsTable />
    </div>
  );
};

export default AdminPanel;
