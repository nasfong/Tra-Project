import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

type PaginationDemoProps = {
  total?: number;
  totalPages?: number;
  currentPage?: number;
  limit?: number;
};

export function PaginationDemo({
  totalPages = 0,
  // total,
  // limit,
  currentPage = 1,
}: PaginationDemoProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const disabled = (status: boolean) => cn({ "pointer-events-none opacity-20": status });

  return totalPages > 1 ? (
    <>
      <div className="text-xs text-muted-foreground sr-only sm:not-sr-only">
        {/* Showing <strong>1-10</strong> of <strong>{total}</strong> Totals */}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            onClick={() => onClickPage(currentPage - 1)}
            className={disabled(currentPage === 1)}
          >
            <PaginationPrevious />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return index >= currentPage - 2 && index < currentPage + 1 ? (
              <PaginationItem onClick={() => onClickPage(page)} key={index}>
                <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
              </PaginationItem>
            ) : index === 0 || index === currentPage + 1 ? (
              <PaginationItem key={index} className="pointer-events-none">
                <PaginationEllipsis />
              </PaginationItem>
            ) : null;
          })}
          <PaginationItem className={disabled(currentPage === totalPages)}>
            <PaginationNext onClick={() => onClickPage(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  ) : null;
}
