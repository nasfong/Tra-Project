import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Constant } from "@/lib/constant";
import { ListFilter } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const CustomerFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') || '';

  const onFilter = (s: string) => {
    searchParams.delete('page')
    if (s === "") {
      searchParams.delete('status');
    } else {
      searchParams.set('status', s);
    }
    setSearchParams(searchParams, { replace: true });
  };

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
        <DropdownMenuCheckboxItem onClick={() => onFilter("")} checked={status === ""}>
          All
        </DropdownMenuCheckboxItem>
        {Object.entries(Constant.status).map(([key, value]) => (
          <DropdownMenuCheckboxItem
            key={key}
            onClick={() => onFilter(value.toString())}
            checked={status === value.toString()}
          >
            {key}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
