import React from "react";
import { cn } from "@/lib/utils";

import { AdminProductProps } from "@/hooks/admin/admin-product";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
  admin: AdminProductProps;
}

export const AdminTopBar: React.FC<Props> = (props) => {
  const { className, admin } = props;
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Label className="flex items-center gap-2 cursor-pointer">
        <Checkbox
          checked={admin.allChecked}
          onCheckedChange={admin.handleToggleAll}
        />
        All
      </Label>
      <div className="flex gap-3">
        <Button
          disabled={admin.checked.size === 0 || admin.uploading}
          onClick={admin.handleUpdate}
        >
          {admin.uploading ? "Uploading..." : "Update"}
        </Button>
        <Button
          disabled={admin.checked.size === 0}
          onClick={admin.handleDelete}
          variant="destructive"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
