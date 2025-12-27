import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreatePollController } from "@/hooks/logic/useCreatePollController";
import { toast } from "sonner";
import { ERROR_MESSAGE } from "@/constants/errors";

export function CreatePollModal() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const { mutate } = useCreatePollController(setOpen, setQuestion, setOptions);

  const canAddOption =
    options.every((opt) => opt.trim() !== "") && options.length < 10;
  const canCreatePoll =
    question.trim() !== "" &&
    options.length >= 2 &&
    options.length <= 10 &&
    options.every((opt) => opt.trim() !== "") &&
    expiryDate &&
    expiryTime;

  const addOption = () => {
    if (canAddOption) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreate = () => {
    let expiresAt: string = new Date(
      `${expiryDate}T${expiryTime}`
    ).toISOString();
    if (expiresAt === "Invalid Date" || expiresAt < new Date().toISOString()) {
      toast.error(ERROR_MESSAGE.INVALID_DATE);
      return;
    }
    console.log("[v0] Creating poll:", { question, options, expiresAt });
    mutate({ question, options, expiresAt });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="rounded-full px-8 shadow-lg transition-all hover:scale-105"
        >
          Create a Poll
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create New Poll</DialogTitle>
          <DialogDescription>
            Ask a question and give your audience options to vote on.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              placeholder="What's your favorite color?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Options</Label>
            <ScrollArea className="max-h-50 pr-4">
              <div className="flex flex-col gap-2 py-1">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                    />
                    {options.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Button
              variant="outline"
              size="sm"
              onClick={addOption}
              disabled={!canAddOption}
              className="mt-2 w-full border-dashed bg-transparent"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Option
            </Button>
            {!canAddOption && (
              <p className="text-[10px] text-muted-foreground">
                Fill all current options to add more
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Expiry Date</Label>
            <Input
              id="date"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Expiry Time</Label>
            <Input
              id="time"
              type="time"
              value={expiryTime}
              onChange={(e) => setExpiryTime(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} disabled={!canCreatePoll}>
            Create Poll & Copy Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
