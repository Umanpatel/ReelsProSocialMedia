"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


function  Register() {
    // first amuk state banaviye:
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    // have user ne redirect kari sakiye
    // Ek hook use kariye: useRouter. 
    // pan useRouter navigation valu j use karvu kem ke user ne aapde navigate karavu chhe
    const  router = useRouter() // aa hook thi user ne aapde gamme tya push kari sakiye
    // Khali aapde user ne push karavava mate router.push lakhavu pade

    // Aa badhi state aavi gai
    // state ni ander form value fill karo chho to ek submit button hovu joiye
    // async ma ek e(event) hase, TS chhe etle e ni type define karvi padse
    // e ni type React formevent chhe, further ema values kayi aavse e pan define kari sako HTMLFormElement
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // form submit na thay or reload na thay ena mate preventDefault method event mathi laisu
        e.preventDefault()
        // check password with confirm password
        if(password !== confirmPassword){
            setError("Your password does not match!!!")
        }

        // have a badhi values ne submit kevi rite karvani
        // ena mate try catch: 
        try {
            // fetch method no use karsu, 
            // fetch method kaya path par mokalvani chhe e path define karo
            // Aa path j nai bija pan data sathe mokalvana chhe,
            // je pan bija data joiye ene pass kari do.
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({email, password})
            })

            // Aa response mathi data lai lesu, and data ma store karsu
            const data = res.json()

            // response ok nathi, kaik missing hoy to resgitration failed thase
            if(!res.ok)
            {
                setError("Registration Failed")
            }

            // if response ok to registration successful
            router.push("/login")

        } catch (error) {
            setError("Try Again!!!")
        }

    }
    return (
    <div>Register</div>
  )
}

export default Register