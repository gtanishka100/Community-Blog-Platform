import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-black">Sign in</h2>

        <button className="w-full border rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
          <img src="./Images/google.png" alt="Google" className="w-7 h-7" />
          Continue with Google
        </button>

        <button className="w-full border rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
          <img src="/apple-icon.svg" alt="Apple" className="w-5 h-5" />
          Sign in with Apple
        </button>

        <div className="flex items-center gap-2 my-2">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <input
          type="text"
          placeholder="Email or phone"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500"
        />
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-16 focus:outline-blue-500"
          />
          <span className="absolute top-2 right-3 text-sm text-blue-600 cursor-pointer hover:underline">
            Show
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <Link href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="flex items-center mt-2">
          <input type="checkbox" className="mr-2" id="keepLogged" />
          <label htmlFor="keepLogged" className="text-sm">
            Keep me logged in
          </label>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Sign in
        </button>

        <p className="text-center text-sm mt-4">
          New to LinkedIn?{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Join now
          </Link>
        </p>
      </div>
    </div>
  );
}
