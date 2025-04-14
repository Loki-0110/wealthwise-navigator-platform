
import { useState } from "react";
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { createUserAccount } from "@/services/supabaseService";
import { PlusCircle } from "lucide-react";

export const AddAccountForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [balance, setBalance] = useState(0);
  const [institution, setInstitution] = useState("");
  const [isCredit, setIsCredit] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const newAccount = {
        user_id: user.id,
        name,
        account_type: accountType,
        balance,
        institution,
        is_credit: isCredit
      };
      
      await createUserAccount(newAccount);
      
      toast({
        title: "Account Added",
        description: "Your account has been successfully added."
      });
      
      // Reset form
      setName("");
      setAccountType("checking");
      setBalance(0);
      setInstitution("");
      setIsCredit(false);
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Account Name</Label>
              <Input 
                id="name"
                placeholder="e.g. Main Checking"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-type">Account Type</Label>
              <Select 
                value={accountType} 
                onValueChange={setAccountType}
                required
              >
                <SelectTrigger id="account-type">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="balance">Current Balance ($)</Label>
              <Input 
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Financial Institution</Label>
              <Input 
                id="institution"
                placeholder="e.g. Bank of America"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />
            </div>
            
            {accountType === 'credit' && (
              <div className="flex items-center space-x-2">
                <Switch 
                  id="is-credit"
                  checked={isCredit}
                  onCheckedChange={setIsCredit}
                />
                <Label htmlFor="is-credit">This is a credit card</Label>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
