import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, Users } from "lucide-react";
import Navbar from "@/components/features/common/Navbar";
import Footer from "@/components/features/common/Footer";
import { useNavigate, useParams } from "react-router-dom";
import type { getPollOutType } from "@/types/pollTypes";
import { useGetPollController } from "@/hooks/logic/useGetPollController";
import { validatePollCode } from "@/utils/validatePollCode";
import { toast } from "sonner";
import { ERROR_MESSAGE } from "@/constants/errors";
import { getVoterId } from "@/utils/voter";

export default function Poll() {
  const { pollCode } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [pollDetails, setPollDetails] = useState<getPollOutType | null>(null);
  const { mutate } = useGetPollController(setPollDetails);
  const navigate = useNavigate();
  useEffect(() => {
    if (!pollCode || !validatePollCode(pollCode)) {
      toast.error(ERROR_MESSAGE.INVALID_POLL_LINK);
      navigate("/");
      return;
    }
    const voterId = getVoterId();
    mutate({ pollCode, voterId });
  }, []);

  const handleVote = async () => {
    if (!selectedOption || !pollCode) return;

    setSubmitting(true);

    // setPollDetails({ ...pollDetails, options: updatedOptions });

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      <main className="container mx-auto flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Get to know
          </h1>
          <p className="text-xl text-muted-foreground">
            Collect real-time feedback with interactive polls designed to be
            refreshingly different.
          </p>
        </div>

        <Card className="w-full max-w-lg shadow-xl border-t-4 border-t-primary">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {pollDetails?.isActive && pollDetails?.hasVoted
                  ? "Live Result"
                  : pollDetails?.isActive && !pollDetails?.hasVoted
                  ? "Live Poll"
                  : "Poll Result"}
              </span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{pollDetails?.totalVotes} votes</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold leading-tight">
              {pollDetails?.poll.question}
            </CardTitle>
            <CardDescription>
              {pollDetails?.hasVoted
                ? "Real-time results from the community"
                : "Select one option to cast your vote and see results."}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {!pollDetails?.hasVoted && pollDetails?.isActive ? (
              <RadioGroup onValueChange={setSelectedOption} className="gap-3">
                {pollDetails?.options.map((option) => (
                  <div
                    key={option.id}
                    className={`group relative flex items-center space-x-3 rounded-xl border-2 p-4 transition-all hover:border-primary/50 cursor-pointer ${
                      selectedOption === option.id.toString()
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card"
                    }`}
                    onClick={() => setSelectedOption(option.id.toString())}
                  >
                    <RadioGroupItem
                      value={option.id.toString()}
                      id={option.id.toString()}
                      className="sr-only"
                    />
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedOption === option.id.toString()
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {selectedOption === option.id.toString() && (
                        <div className="h-2 w-2 rounded-full bg-background" />
                      )}
                    </div>
                    <Label
                      htmlFor={option.id.toString()}
                      className="flex-1 cursor-pointer text-base font-semibold transition-colors group-hover:text-primary"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-6 py-2">
                {pollDetails?.options.map((option) => {
                  const percentage = Math.round(
                    (option.count / (pollDetails.totalVotes + 1)) * 100
                  );
                  return (
                    <div
                      key={option.id}
                      className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-bold">
                          {option.text}
                          {pollDetails?.hasVoted === option.id && (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          )}
                        </span>
                        <span className="font-mono font-medium">
                          {percentage}%
                        </span>
                      </div>
                      <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary/50">
                        <div
                          className={`h-full transition-all duration-1000 ease-out rounded-full ${
                            pollDetails?.hasVoted === option.id
                              ? "bg-primary"
                              : "bg-primary/40"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        {option.count} votes
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t bg-muted/20 p-6">
            {!pollDetails?.hasVoted && pollDetails?.isActive ? (
              <Button
                onClick={handleVote}
                disabled={!selectedOption || submitting}
                className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Casting your vote...
                  </>
                ) : (
                  "Submit Vote"
                )}
              </Button>
            ) : (
              pollDetails?.hasVoted && (
                <div className="text-center w-full">
                  <p className="text-sm font-medium text-primary mb-2">
                    Thank you for voting!
                  </p>
                </div>
              )
            )}
            <p className="text-[10px] text-center text-muted-foreground font-medium uppercase tracking-widest">
              Secure & Anonymous
            </p>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
