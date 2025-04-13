
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export const TermsCheckbox = ({ checked, onChange }: TermsCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="terms" 
        checked={checked} 
        onCheckedChange={onChange}
      />
      <label
        htmlFor="terms"
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I agree to the{" "}
        <Link to="/terms" className="text-primary hover:underline">
          terms and conditions
        </Link>
      </label>
    </div>
  );
};
