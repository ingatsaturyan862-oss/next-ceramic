import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Color } from "@prisma/client";
import { ChevronDown } from "lucide-react";

const Dot = ({ name }: { name: string }) => (
  <span
    style={{ backgroundColor: name }}
    className="w-4 h-4 rounded-full border shrink-0"
  />
);

export const AdminColorSelect = ({
  colors,
  selected,
  onChange,
  disabled,
}: {
  colors: Color[];
  selected: number[];
  onChange: (ids: number[]) => void;
  disabled?: boolean;
}) => {
  const picked = colors.filter((c) => selected.includes(c.id));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled}>
        <button className="flex items-center gap-2 border rounded px-3 py-2 text-sm min-w-36 disabled:opacity-50 disabled:cursor-default hover:bg-muted transition-colors">
          {picked.length === 0 ? (
            <span className="text-muted-foreground">Colors</span>
          ) : (
            <div className="flex gap-1 flex-wrap">
              {picked.map((c) => (
                <Dot key={c.id} name={c.name} />
              ))}
            </div>
          )}
          <ChevronDown size={14} className="ml-auto shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {colors.map((color) => (
          <DropdownMenuCheckboxItem
            key={color.id}
            checked={selected.includes(color.id)}
            onCheckedChange={(checked) =>
              onChange(
                checked
                  ? [...selected, color.id]
                  : selected.filter((id) => id !== color.id),
              )
            }
          >
            <div className="flex items-center gap-2">
              <Dot name={color.name} />
              {color.name}
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
