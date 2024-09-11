import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Constant } from "@/lib/constant"
import { ListFilter } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

export const CustomerFilter = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get('filter') || '';

  const onFilter = (status: string) => {
    if (status === '') {
      queryParams.delete('filter');
      navigate({ search: queryParams.toString() }, { replace: true });
      return
    }
    navigate(`?filter=${status}`, { replace: true });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Filter
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem onClick={() => onFilter('')} checked={filter === ""}>
          All
        </DropdownMenuCheckboxItem>
        {Object.keys(Constant.status).map(status => (
          <DropdownMenuCheckboxItem key={status} onClick={() => onFilter(status)} checked={filter === status}>
            {status}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

