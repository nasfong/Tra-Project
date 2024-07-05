import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom"

const total = 10

export function PaginationDemo() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current page from the query parameters
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  const onClickPage = (page: number) => {
    // Handle click event and update current page
    navigate(`?page=${page}`, { replace: true });
  }

  const disabled = (status: boolean) => cn({ "pointer-events-none opacity-20": status })
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => onClickPage(currentPage - 1)} className={disabled(currentPage === 1)} >
          <PaginationPrevious />
        </PaginationItem>
        {Array.from({ length: total }, (_, index) => {
          const page = index + 1
          return index >= currentPage - 2 && index < currentPage + 1 ? (
            <PaginationItem onClick={() => onClickPage(page)} key={index}>
              <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
            </PaginationItem>
          ) : index === 0 || index === currentPage + 2 ? (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null
        })}
        {/* <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem> */}
        <PaginationItem className={disabled(currentPage === total)}>
          <PaginationNext onClick={() => onClickPage(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
