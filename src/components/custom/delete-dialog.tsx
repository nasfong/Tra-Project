"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React, { forwardRef, useState } from "react";

type DeleteButtonProps = ButtonProps & {
  handleConfirm: () => void;
  loading: boolean;
  children: React.ReactElement;
};

export const DeleteDialog = forwardRef<HTMLButtonElement, DeleteButtonProps>(
  ({ handleConfirm, loading, children, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    const onChangeModal = (isOpen: boolean) => setOpen(isOpen);

    const clonedChildren = React.cloneElement(children, {
      type: 'button',
      size: 'sm',
      variant: 'outline',
      onClick: () => setOpen(true),
      ref,
      ...props,
    })


    return (
      <>
        <AlertDialog open={open} onOpenChange={onChangeModal} >
          <AlertDialogTrigger asChild>
            {clonedChildren}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone This will permanently delete your
                account and remove your data from our servers
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <Button onClick={handleConfirm} loading={loading}>
                Delete
                <Trash2 className="ml-2 h-4 w-4" />
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
);
