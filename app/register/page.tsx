// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useNotification } from "../components/Notification";
// import Link from "next/link";

// function  Register() {
//     // first amuk state banaviye:
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const { showNotification } = useNotification();
//     // have user ne redirect kari sakiye
//     // Ek hook use kariye: useRouter. 
//     // pan useRouter navigation valu j use karvu kem ke user ne aapde navigate karavu chhe
//     const  router = useRouter() // aa hook thi user ne aapde gamme tya push kari sakiye
//     // Khali aapde user ne push karavava mate router.push lakhavu pade

//     // Aa badhi state aavi gai
//     // state ni ander form value fill karo chho to ek submit button hovu joiye
//     // async ma ek e(event) hase, TS chhe etle e ni type define karvi padse
//     // e ni type React formevent chhe, further ema values kayi aavse e pan define kari sako HTMLFormElement
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         // form submit na thay or reload na thay ena mate preventDefault method event mathi laisu
//         e.preventDefault()
//         // check password with confirm password
//         if(password !== confirmPassword){
//             showNotification("Passwords do not match", "error");
//             return;
//         }

//         // have a badhi values ne submit kevi rite karvani
//         // ena mate try catch: 
//         try {
//             // fetch method no use karsu, 
//             // fetch method kaya path par mokalvani chhe e path define karo
//             // Aa path j nai bija pan data sathe mokalvana chhe,
//             // je pan bija data joiye ene pass kari do.
//             const res = await fetch("/api/auth/register", {
//                 method: "POST",
//                 headers: {"Content-Type":"application/json"},
//                 body: JSON.stringify({email, password})
//             })

//             // Aa response mathi data lai lesu, and data ma store karsu
//             const data = res.json()

//             // response ok nathi, kaik missing hoy to resgitration failed thase
//             if(!res.ok)
//             {
//                 throw new Error(data.error || "Registration failed");
//             }

            
//             showNotification("Registration successful! Please log in.", "success");
//             // if response ok to registration successful
//             router.push("/login")

//         } catch (error) {
//             showNotification(
//                 error instanceof Error ? error.message : "Registration failed",
//                 "error"
//               );
//         }

//     }
//     return (
//         <div className="max-w-md mx-auto">
//         <h1 className="text-2xl font-bold mb-4">Register</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="block mb-1">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             Register
//           </button>
//           <p className="text-center mt-4">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-500 hover:text-blue-600">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//   )
// }

// export default Register


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      showNotification("Registration successful! Please log in.", "success");
      router.push("/login");
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Registration failed",
        "error"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}