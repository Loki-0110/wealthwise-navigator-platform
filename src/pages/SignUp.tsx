
import { SignUpForm } from "@/components/auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-6 text-center">
        <div className="w-12 h-12 rounded-lg bg-finance-blue-dark flex items-center justify-center mx-auto mb-4">
          <div className="text-white font-bold text-2xl">W</div>
        </div>
        <h1 className="text-3xl font-bold text-finance-blue-dark">WealthWise</h1>
        <p className="text-gray-500">Create your account to get started</p>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
