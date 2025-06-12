import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";

function CreateBudget({refreshData}) {
  const [emojiIcon, setEmojiIcon] = useState("🤑");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const { user } = useUser();
  const onCreateBudget = async () => {
    const res = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });
    if (res) {
      refreshData()
      toast("Budget created successfully!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                onChange={(e) => setName(e.target.value)}
                placeholder="eg. Home Decor"
              />
            </div>
            <div className="mt-2">
              <label className="block mb-1 text-black font-medium text-sm">
                Budget Amount
              </label>
              <Input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="eg. ₹5000 "
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!name || !amount}
                onClick={onCreateBudget}
                className="w-full mt-4 cursor-pointer"
                variant={"default"}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
