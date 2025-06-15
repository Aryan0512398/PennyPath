"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PenBoxIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";


function EditBudget({budgetInfo,refreshData}) {
     const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || "🤑");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name || "");
  const [amount, setAmount] = useState(budgetInfo?.amount || 0);
  const { user } = useUser();
  const onUpdateBudget = async () => {
    const res = await db
      .update(Budgets)
      .set({
        name,
        amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();
    if (res) {
        // Refresh the budget info after update
      refreshData();
      toast("Budget updated successfully!");
      setName("");
      setAmount(0);
      setShowEmojiPicker(false);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className={"cursor-pointer"}>
            {" "}
            <PenBoxIcon></PenBoxIcon>Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update  Budget</DialogTitle>
            <DialogDescription>
              Select an emoji and give your budget a name.
            </DialogDescription>
          </DialogHeader>

          {/* ✅ Move layout content OUTSIDE DialogDescription */}
          <div className="mt-4 space-y-4">
            <div className="relative">
              <Button
                size={"lg"}
                variant={"outline"}
                className={"cursor-pointer text-lg"}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {emojiIcon}
              </Button>
              {showEmojiPicker && (
                <span className="p-2 pt-0 absolute z-50">
                  <EmojiPicker
                    emojiStyle="apple"
                    width="100%"
                    height={400}
                    autoFocusSearch={true}
                    previewConfig={{ showPreview: false }}
                    searchDisabled={false}
                    onEmojiClick={(emoji) => {
                      setEmojiIcon(emoji.emoji);
                      setShowEmojiPicker(false);
                    }}
                  />
                </span>
              )}
            </div>

            <div className="mt-2">
              <label className="block mb-1 text-black font-medium text-sm">
                Budget Name
              </label>
              <Input
                onChange={(e) => setName(e.target.value)} defaultValue={budgetInfo?.name || ""}
                placeholder="eg. Home Decor"
              />
            </div>
            <div className="mt-2">
              <label className="block mb-1 text-black font-medium text-sm">
                Budget Amount
              </label>
              <Input
                type="number"
                onChange={(e) => setAmount(e.target.value)} defaultValue={budgetInfo?.amount || ""}
                placeholder="eg. ₹5000 "
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!name || !amount || !emojiIcon}
                onClick={onUpdateBudget}
                className="w-full mt-4 cursor-pointer"
                variant={"default"}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
