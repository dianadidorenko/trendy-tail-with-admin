import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const PagesNav = ({ items = [] }) => {
  const path = useParams();
  const pathname = usePathname();
  const itemName = items.find((item) => path.productId === item.urlName);
  const pathName = items.find((item) => pathname === "/" + item.category);

  return (
    <div className="flex items-center gap-1 py-2">
      <Link href="/">
        <div className="text-primary/50 flex items-center dark:text-white/50">
          <p>Головна</p>
          <ChevronRight
            size={18}
            className={`${
              itemName || pathName?.categoryShow
                ? "text-primary/50 dark:text-white/50"
                : "text-primary dark:text-white/90"
            }`}
          />
        </div>
      </Link>

      {(itemName?.name || pathName?.categoryShow) && (
        <div className="flex items-center gap-1">
          <Link href="/catalog">
            <p
              className={`${
                itemName || pathName?.categoryShow
                  ? "text-primary/50 dark:text-white/50"
                  : "text-primary"
              }`}
            >
              Каталог
            </p>
          </Link>

          <div className="flex items-center gap-1">
            <ChevronRight
              size={18}
              className={`${
                itemName || pathName?.categoryShow
                  ? "text-primary dark:text-white/90"
                  : "text-primary/50"
              }`}
            />
            <p className="text-primary dark:text-white/90">{itemName?.name}</p>
          </div>
        </div>
      )}

      {/* Проверка на путь "/about" */}
      {pathname === "/catalog" && (
        <p className="text-primary flex items-center dark:text-white/90">
          Каталог
        </p>
      )}

      {/* Проверка на путь "/about" */}
      {pathname === "/about" && (
        <p className="text-primary flex items-center dark:text-white/90">
          О нас
        </p>
      )}

      {/* Проверка на путь "/delivery" */}
      {pathname === "/delivery" && (
        <p className="text-primary flex items-center dark:text-white/90">
          Доставка
        </p>
      )}

      {/* Проверка на путь "/contacts" */}
      {pathname === "/contacts" && (
        <p className="text-primary flex items-center dark:text-white/90">
          Контакти
        </p>
      )}

      {pathName?.categoryShow && (
        <div className="flex items-center gap-1">
          <Link href={`/${pathName?.category}`}>
            <p className="text-primary dark:text-white/90">
              {pathName?.categoryShow}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PagesNav;
